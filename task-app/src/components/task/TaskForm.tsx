import { FormEvent, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Task, SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { TaskFormContainer } from './TaskForm.style';
import { postTaskService, updateTaskService } from '../../services/taskService';
import { ButtonGroup } from '../button/Button.style';
import { Form } from '../form/Form';
import Button, { BUTTON_COLOR } from '../button/Button';
import { addTask, getDailyTasksSelector, getTaskSelector, updateTask } from '../../store/reducers/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type ValidationProps = {
    isValid: boolean;
    message: string;
};
type TaskFormProps = {
    setOpenForm: Dispatch<SetStateAction<boolean>>;
    task?: Task;
    activeDay?: string;
    validate(task: Task): ValidationProps;
};

export const TaskForm = ({ setOpenForm, task, activeDay, validate }: TaskFormProps) => {
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
    //TODO refactor -> change with validation message and add field name to create different messages for different fields
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <TaskFormContainer>
            <Form onSubmit={handleFormSubmit}>
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
                    alert={errorMessage}
                />
                {/* <Row> */}
                <FormInput
                    label="Start Time"
                    type="time"
                    name="start"
                    value={taskInputFields.start}
                    onChange={handleChange}
                    alert={errorMessage}
                />
                <FormInput
                    label="End Time"
                    type="time"
                    name="end"
                    value={taskInputFields.end}
                    max="23:59"
                    onChange={handleChange}
                />
                <Button
                    color={BUTTON_COLOR.button}
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
                {taskInputFields.subTasks.length > 0 &&
                    taskInputFields.subTasks.map((subTask) => {
                        return (
                            <div>
                                <FormInput
                                    key={subTask.id}
                                    label="SubDescription"
                                    type="text"
                                    name="description"
                                    value={subTask.description}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(subTask.id, e)}
                                    required
                                />
                                <FormInput
                                    label="Start Time"
                                    type="time"
                                    name="start"
                                    value={subTask.start}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(subTask.id, e)}
                                />
                                <FormInput
                                    label="End Time"
                                    type="time"
                                    name="end"
                                    value={subTask.end}
                                    max="23:59"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(subTask.id, e)}
                                />
                            </div>
                        );
                    })}
                {/* </Row> */}
                <ButtonGroup>
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

    function validateTaskTime() {
        return validate(taskInputFields).isValid ? true : setErrorMessage(validate(taskInputFields).message);
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

    function handleSubTaskChange(id: string | undefined, event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event?.target.name;
        const value = event.target.value;

        setTaskInputFields((prev) => ({
            ...prev,
            subTasks: prev.subTasks.map((sub) => {
                return sub.id === id
                    ? {
                          ...sub,
                          [name]: value,
                      }
                    : sub;
            }),
        }));
    }
};
