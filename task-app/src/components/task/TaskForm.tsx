import {
    FormEvent,
    useState,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import { Task, SubTask } from '../../Types';
import { FormInput } from '../form/FormInput';
import { TaskFormContainer } from './TaskForm.style';
import { postTask, updateTask } from '../../services/taskService';
import { longDateFormat } from '../../utils/dateHelpers';
import { parseISO, formatISO, format } from 'date-fns';
import { Row } from '../../App.style';
import { ButtonGroup } from '../button/Button.style';
import { Form } from '../form/Form';
import Button, { BUTTON_TYPE } from '../button/Button';
//use immer for the state
type TaskFormProps = {
    setOpenForm?: Dispatch<SetStateAction<boolean>>;
    setTasks?: Dispatch<SetStateAction<Task[]>>;
    task?: Task;
    activeDay?: string;
    handleUpdateTask?: (task: Task) => void;
};

export const TaskForm = ({
    setOpenForm,
    setTasks,
    task,
    activeDay,
    handleUpdateTask,
}: TaskFormProps) => {
    const subTask: SubTask = {
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
    const selectedTask = task || newTask;
    const [taskInputFields, setTaskInputFields] = useState<Task>(selectedTask);
    // console.log(selectedTask, taskInputFields);
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
                    onChange={handleChange}
                />
                <Button
                    type={BUTTON_TYPE.button}
                    onClick={() => {
                        setTaskInputFields({
                            ...taskInputFields,
                            subTasks: [
                                ...taskInputFields.subTasks,
                                ...[subTask],
                            ],
                        });
                    }}
                >
                    Add SubTask
                </Button>
                {taskInputFields.subTasks.length > 0 &&
                    taskInputFields.subTasks.map((task, index) => {
                        return (
                            // one subtaskline
                            <div>
                                <FormInput
                                    key={task.id}
                                    label="SubDescription"
                                    type="text"
                                    name="description"
                                    value={task.description}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => handleSubTaskChange(index, e)}
                                />
                            </div>
                        );
                    })}
                {/* </Row> */}
                <ButtonGroup>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </ButtonGroup>
            </Form>
        </TaskFormContainer>
    );

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        console.log(taskInputFields);
        const promise = () =>
            selectedTask.id
                ? updateTask(taskInputFields)
                : postTask(taskInputFields);

        return promise().then((task: Task) => {
            // console.log('onsave', task);
            setOpenForm?.(false);
            setTasks?.((prevTasks) => {
                const existTaskIndex = prevTasks.findIndex(
                    (prevTask) => prevTask.id === task.id
                );
                if (existTaskIndex >= 0) {
                    return prevTasks.map((prevTask) =>
                        prevTask.id === task.id ? task : prevTask
                    );
                } else {
                    return [...prevTasks, task];
                }
            });
            handleUpdateTask?.(task);
        });
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
    function handleSubTaskChange(
        index: number,
        event: ChangeEvent<HTMLInputElement>
    ) {
        const name = event?.target.name;
        setTaskInputFields((prev) => ({
            ...prev,
            subTasks: prev.subTasks.map((sub, i) => {
                return index === i
                    ? {
                          ...sub,
                          [name]: event.target.value,
                      }
                    : sub;
            }),
        }));
    }

    function handleCancel() {
        console.log('cancelled');
    }

    function validateDate(date: Date | string) {
        if (!Number.isNaN(new Date(date).getTime())) {
            return formatISO(new Date(date), { representation: 'date' });
        } else {
            //TODO use library instead of doing this:()
            console.log('invalid date');
            return formatISO(new Date(), { representation: 'date' });
        }
    }
};
