import { FormEvent, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { deleteSubTaskService, postTaskService, updateTaskService } from '../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask, getTaskByIdSelector, updateTask } from '../../store/reducers/tasksSlice';
import { checkSubtasksOverlap, errorMessages, hasExceedTimeTask, mapValidations } from '../../utils/validationHelpers';
import { Task, SubTask } from '../../Types';
import Button, { BUTTON_TYPE } from '../button/Button';
import { FormInput } from '../form/FormInput';
import { Form } from '../form/Form';
import { SubtaksInputContainer, TaskFormContainer } from './TaskForm.style';
import { ButtonRow } from '../button/Button.style';
import { FormContent, TimeInputContainer } from '../form/Form.style';
import { ICON_TYPE } from '../button/Icon.style';

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
            <Form onSubmit={handleFormSubmit}>
                <FormContent>
                    <FormInput
                        label="Title"
                        type="text"
                        name="title"
                        value={taskInputFields.title}
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        label="Description"
                        type="text"
                        name="description"
                        value={taskInputFields.description}
                        onChange={handleChange}
                    />
                    <TimeInputContainer>
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
                            max="23:59"
                            onChange={handleChange}
                            required
                            messages={validations['task']}
                        />
                    </TimeInputContainer>
                    {/* but collapse for subTask, put button on top just icon */}
                    <ButtonRow $end>
                        <Button
                            icon={ICON_TYPE.add}
                            btnType={BUTTON_TYPE.link}
                            type="button"
                            onClick={() => {
                                setTaskInputFields({
                                    ...taskInputFields,
                                    subTasks: [...taskInputFields.subTasks, ...[subTaskField]],
                                });
                            }}
                        >
                            Add SubTask
                        </Button>
                    </ButtonRow>
                    {/* <button type="link">Create SubTask</button> */}
                    {taskInputFields.subTasks.length > 0 &&
                        taskInputFields.subTasks.map((subTask, index) => {
                            return (
                                <SubtaksInputContainer>
                                    <Button
                                        icon={ICON_TYPE.delete}
                                        type="button"
                                        btnType={BUTTON_TYPE.delete}
                                        onClick={() => handleDeleteSubTask(subTask.id!)}
                                    >
                                        Delete
                                    </Button>

                                    <FormInput
                                        key={subTask.id}
                                        label="SubDescription"
                                        type="text"
                                        name="description"
                                        value={subTask.description}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(index, e)}
                                        required
                                    />
                                    <TimeInputContainer>
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
                                    </TimeInputContainer>
                                </SubtaksInputContainer>
                            );
                        })}
                </FormContent>
                <ButtonRow $center pt="1">
                    <Button btnType={BUTTON_TYPE.secondary} onClick={() => setOpenForm(false)}>
                        Cancel
                    </Button>
                    <Button btnType={BUTTON_TYPE.submit}>Save</Button>
                </ButtonRow>
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
        return deleteSubTaskService(id);
    }
};
