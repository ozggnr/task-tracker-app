import { FormEvent, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Task, SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { TaskFormContainer } from './TaskForm.style';
import { postTaskService, updateTaskService } from '../../services/taskService';
import { ButtonGroup } from '../button/Button.style';
import { Form } from '../form/Form';
import Button, { BUTTON_COLOR } from '../button/Button';
import { addTask, getTaskSelector, updateTask } from '../../store/reducers/tasksSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type TaskFormProps = {
    setOpenForm: Dispatch<SetStateAction<boolean>>;
    task?: Task;
    activeDay?: string;
};

export const TaskForm = ({ setOpenForm, task, activeDay }: TaskFormProps) => {
    const subTask: SubTask = {
        date: activeDay!,
        description: '',
        start: '',
        end: '',
        status: 'NOT_STARTED',
    };
    const newTask: Task = {
        date: activeDay!,
        title: '',
        description: '',
        start: '',
        end: '',
        status: 'NOT_STARTED',
        subTasks: [],
    };
    const dispatch = useAppDispatch();
    //We can extract the value that we want withing the selector since record of the value is kept for each individual useSelectorx
    const activeTask = useAppSelector(getTaskSelector(task?.id!));
    const selectedTask = activeTask || newTask;
    const [taskInputFields, setTaskInputFields] = useState<Task>(selectedTask);

    return (
        <TaskFormContainer>
            <Form onSubmit={handleFormSubmit}>
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
                {/* <Row> */}
                <FormInput
                    label="Start Time"
                    type="time"
                    name="start"
                    value={taskInputFields.start}
                    onChange={handleChange}
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
                            subTasks: [...taskInputFields.subTasks, ...[subTask]],
                        });
                    }}
                >
                    Add SubTask
                </Button>
                {taskInputFields.subTasks.length > 0 &&
                    taskInputFields.subTasks.map((subTask, index) => {
                        return (
                            <div>
                                <FormInput
                                    key={subTask.id}
                                    label="SubDescription"
                                    type="text"
                                    name="description"
                                    value={subTask.description}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(index, e)}
                                />
                                <FormInput
                                    label="Start Time"
                                    type="time"
                                    name="start"
                                    value={subTask.start}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(index, e)}
                                />
                                <FormInput
                                    label="End Time"
                                    type="time"
                                    name="end"
                                    value={subTask.end}
                                    max="23:59"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSubTaskChange(index, e)}
                                />
                            </div>
                        );
                    })}
                {/* </Row> */}
                <ButtonGroup>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleCancel}>
                        Cancel
                    </Button>
                </ButtonGroup>
            </Form>
        </TaskFormContainer>
    );

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        // setOpenForm?.(false);
        if (selectedTask.id) {
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

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event.target.name;
        setTaskInputFields((prev) => ({
            ...prev,
            [name]: event.target.value,
        }));
    }
    //TODO check why we don't use id instead of index
    function handleSubTaskChange(index: number, event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event?.target.name;
        setTaskInputFields((prev) => ({
            ...prev,
            subTasks: prev.subTasks.map((sub, i) => {
                return index === i
                    ? {
                          ...sub,
                          date: activeDay,
                          [name]: event.target.value,
                      }
                    : sub;
            }),
        }));
    }

    function handleCancel() {
        setOpenForm(false);
    }
};
