import { FormEvent, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { deleteSubTaskService, postTaskService, updateTaskService } from '../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask, getTaskByIdSelector, updateTask } from '../../store/reducers/tasksSlice';
import { checkSubtasksOverlap, errorMessages, hasExceedTimeTask, mapValidations } from '../../utils/validationHelpers';
import { Task, SubTask } from '../../Types';
import Button, { BUTTON_TYPE } from '../button/Button';
import { FormInput } from '../form/FormInput';
import { Form } from '../form/Form';
import { longDateFormat } from '../../utils/dateHelpers';
import { SubtakInputContainer, TaskFormContainer, TaskFormHeader } from './TaskForm.style';
import { FormButtonRow, FormContent, FormInputRow } from '../form/Form.style';
import { ICON_SIZE, ICON_TYPE } from '../button/Icon.style';
import { Divider } from '../../Main.style';

type Validation = {
    subtask: MessageType;
    task: MessageType;
};
type MessageType = {
    [key: string]: string[];
};

type TaskFormProps = {
    setOpenForm: Dispatch<SetStateAction<boolean>>;
    task?: Task;
    activeDay?: string;
    isTaskOverlap: (task: Task) => boolean;
};
export const TaskForm = ({ setOpenForm, task, activeDay, isTaskOverlap }: TaskFormProps) => {
    const subTaskField: SubTask = {
        date: activeDay || task?.date!, //Not sure about this
        description: '',
        start: '',
        end: '',
        status: 'NOT_STARTED',
    };
    const newTask: Task = {
        date: activeDay || task?.date!,
        title: '',
        description: '',
        start: '',
        end: '',
        status: 'NOT_STARTED',
        subTasks: [] as SubTask[],
    };

    const dispatch = useAppDispatch();
    //We can extract the value that we want withing the selector since record of the value is kept for each individual useSelectorx
    const activeTask = useAppSelector(getTaskByIdSelector(task?.id!));
    const selectedTask = activeTask || newTask;
    const [taskInputFields, setTaskInputFields] = useState<Task>(selectedTask);
    //TODO refactor validations
    const [validations, setValidations] = useState<Validation>({ subtask: {}, task: {} });

    return (
        <TaskFormContainer>
            <TaskFormHeader>
                <h3>{longDateFormat(selectedTask?.date)}</h3>
                <Button
                    icon={ICON_TYPE.add}
                    iconSize={ICON_SIZE.small}
                    btnType={BUTTON_TYPE.secondary}
                    type="button"
                    onClick={() => {
                        setTaskInputFields({
                            ...taskInputFields,
                            subTasks: [...taskInputFields.subTasks, ...[subTaskField]],
                        });
                    }}
                />
            </TaskFormHeader>
            <Form onSubmit={handleFormSubmit}>
                <FormContent>
                    <FormInputRow>
                        <FormInput
                            label="Title"
                            type="text"
                            name="title"
                            value={taskInputFields.title}
                            onChange={handleChange}
                            required
                            grow="1"
                        />
                        <FormInput
                            label="Description"
                            type="text"
                            name="description"
                            value={taskInputFields.description}
                            onChange={handleChange}
                            grow="3"
                        />

                        <FormInput
                            label="Start Time"
                            type="time"
                            name="start"
                            value={taskInputFields.start}
                            onChange={handleChange}
                            required
                            messages={validations['task']}
                        />
                        <FormInput
                            label="End Time"
                            type="time"
                            name="end"
                            value={taskInputFields.end}
                            onChange={handleChange}
                            required
                            messages={validations['task']}
                        />
                    </FormInputRow>
                    {taskInputFields.subTasks.length > 0 && (
                        <>
                            <Divider />
                            <h3>Subtasks</h3>
                        </>
                    )}
                    {taskInputFields.subTasks.length > 0 &&
                        taskInputFields.subTasks.map((subTask, index) => {
                            return (
                                <SubtakInputContainer key={subTask.id}>
                                    <FormInputRow>
                                        <Button
                                            icon={ICON_TYPE.delete}
                                            type="button"
                                            btnType={BUTTON_TYPE.delete}
                                            onClick={() => handleDeleteSubTask(subTask.id!)}
                                            iconSize={ICON_SIZE.small}
                                        />

                                        <FormInput
                                            label="SubDescription"
                                            type="text"
                                            name="description"
                                            value={subTask.description}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleSubTaskChange(index, e)
                                            }
                                            required
                                            grow="1"
                                        />

                                        <FormInput
                                            label="Start Time"
                                            type="time"
                                            name="start"
                                            value={subTask.start}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleSubTaskChange(index, e)
                                            }
                                            required
                                            messages={validations['subtask']}
                                        />
                                        <FormInput
                                            label="End Time"
                                            type="time"
                                            name="end"
                                            value={subTask.end}
                                            max="23:59"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleSubTaskChange(index, e)
                                            }
                                            required
                                            messages={validations['subtask']}
                                        />
                                    </FormInputRow>
                                </SubtakInputContainer>
                            );
                        })}
                </FormContent>
                <FormButtonRow>
                    <Button type="reset" btnType={BUTTON_TYPE.link} onClick={() => setOpenForm(false)}>
                        Cancel
                    </Button>
                    <Button btnType={BUTTON_TYPE.primary}>Save</Button>
                </FormButtonRow>
            </Form>
        </TaskFormContainer>
    );

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (validateTaskTime()) {
            if (taskInputFields.id) {
                return updateTaskService(taskInputFields).then((updatedTask) => {
                    dispatch(updateTask(updatedTask));
                    setOpenForm(false);
                });
            } else {
                return postTaskService(taskInputFields).then((newTask) => {
                    dispatch(addTask(newTask));
                    setOpenForm(false);
                });
            }
        }
    }
    //TODO refactor this
    function validateTaskTime() {
        let validation = { subtask: {}, task: {} };
        console.log(validation);
        if (isTaskOverlap(taskInputFields)) {
            validation['task'] = mapValidations(['start', 'end'], errorMessages['timeOverlap'], validation['task']);
        }
        if (hasExceedTimeTask(taskInputFields)) {
            validation['subtask'] = mapValidations(['start'], errorMessages['timeExceed'], validation['subtask']);
        }
        if (checkSubtasksOverlap(taskInputFields)) {
            validation['subtask'] = mapValidations(
                ['start', 'end'],
                errorMessages['subtaskOverlap'],
                validation['subtask']
            );
        }

        const isErrorMessageEmpty =
            !Object.keys(validation['task']).length && !Object.keys(validation['subtask']).length;
        if (!isErrorMessageEmpty) {
            const vals = { ...validation };
            setValidations((prev) => ({ ...prev, ...vals }));
        } else {
            //To clear the state
            setValidations({ ...validation });
        }
        return isErrorMessageEmpty;
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        setTaskInputFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubTaskChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event?.target.name;
        const value = event.target.value;

        setTaskInputFields((prev) => ({
            ...prev,
            subTasks: prev.subTasks.map((sub, i) => {
                return index === i
                    ? {
                          ...sub,
                          [name]: value,
                      }
                    : sub;
            }),
        }));
    }

    function handleDeleteSubTask(id: string) {
        setTaskInputFields({
            ...taskInputFields,
            subTasks: [...taskInputFields.subTasks.filter((subs) => subs.id !== id)],
        });
        //not to send empty subtask
        if (id) return deleteSubTaskService(id);
    }
};
