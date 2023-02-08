import { FormEvent, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { postTaskService, updateTaskService } from '../../services/taskService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask, getDailyTasksSelector, getTaskSelector, updateTask } from '../../store/reducers/tasksSlice';
import { checkSubtasksOverlap, errorMessages, hasExceedTimeTask, mapValidations } from '../../utils/validationHelpers';
import { Task, SubTask } from '../../Types';
import Button, { BUTTON_TYPE } from '../button/Button';
import { FormInput } from '../form/FormInput';
import { Form } from '../form/Form';
import { SubtaksInputContainer, TaskFormContainer } from './TaskForm.style';
import { ButtonRow, ButtonGroup } from '../button/Button.style';
import { FormContent, TimeInputContainer } from '../form/Form.style';
import { ICON_TYPE } from '../button/Icon.style';

type Validation = {
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
    const activeTask = useAppSelector(getTaskSelector(task?.id!));
    const selectedTask = activeTask || newTask;
    const [taskInputFields, setTaskInputFields] = useState<Task>(selectedTask);
    //TODO refactor validations
    const [validations, setValidations] = useState<Validation>({});
    console.log(validations);
    return (
        <TaskFormContainer>
            <Form onSubmit={handleFormSubmit}>
                <ButtonRow position="end">
                    <Button
                        icon={ICON_TYPE.add}
                        btnType={BUTTON_TYPE.button}
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
                <FormContent>
                    <FormInput
                        label="Title"
                        type="text"
                        name="title"
                        value={taskInputFields.title}
                        onChange={handleChange}
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
                            // message={validations['start']}
                        />
                        <FormInput
                            label="End Time"
                            type="time"
                            name="end"
                            value={taskInputFields.end}
                            max="23:59"
                            onChange={handleChange}
                            // message={validations['end']}
                        />
                    </TimeInputContainer>
                    {/**TODO Add delete subtask button */}
                    {taskInputFields.subTasks.length > 0 &&
                        taskInputFields.subTasks.map((subTask, index) => {
                            return (
                                <SubtaksInputContainer>
                                    <FormInput
                                        key={subTask.id}
                                        label="SubDescription"
                                        type="text"
                                        name="description"
                                        value={subTask.description}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(index, e)}
                                        // message={validations['description']}
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
                                            // message={validations['start']}
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
                                            // message={validations['end']}
                                        />
                                    </TimeInputContainer>
                                </SubtaksInputContainer>
                            );
                        })}
                </FormContent>
                <ButtonGroup $center>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={() => setOpenForm(false)}>
                        Cancel
                    </Button>
                </ButtonGroup>
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
        let validation = {} as Validation;
        if (isTaskOverlap(taskInputFields)) {
            validation = mapValidations(['start', 'end'], errorMessages['timeOverlap'], validation);
        }
        if (hasExceedTimeTask(taskInputFields)) {
            validation = mapValidations(['start'], errorMessages['timeExceed'], validation);
        }
        if (checkSubtasksOverlap(taskInputFields)) {
            validation = mapValidations(['start', 'end'], errorMessages['subtaskOverlap'], validation);
        }

        const isErrorMessageEmpty = !Object.keys(validation).length;
        if (!isErrorMessageEmpty) {
            const vals = { ...validation };
            setValidations((prev) => ({ ...prev, ...vals }));
        } else {
            setValidations({ ...validation });
        } //To clear the state
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
};
