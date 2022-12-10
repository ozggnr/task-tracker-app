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
import { postTask } from '../../services/taskService';
import { longDateFormat } from '../../utils/dateHelpers';
import { parseISO, formatISO } from 'date-fns';
import { Row } from '../../App.style';
import { ButtonGroup } from '../button/Button.style';
import { Form } from '../form/Form';

type TaskFormProps = {
    setOpenForm?: Dispatch<SetStateAction<boolean>>;
    setTasks?: Dispatch<SetStateAction<Task[]>>;
    task?: Task;
};
const newTask: Task = {
    date: new Date(),
    title: '',
    description: '',
    start: '',
    end: '',
    completed: 'IN_PROGRESS',
    subTasks: [
        {
            description: '',
            start: '',
            end: '',
            completed: 'IN_PROGRESS',
        },
    ],
};
export const TaskForm = ({ setOpenForm, setTasks, task }: TaskFormProps) => {
    const selectedTask = task || newTask;
    const [taskInputFields, setTaskInputFields] = useState<Task>(selectedTask);
    const [subTask, setSubTask] = useState<SubTask>({
        description: '',
        start: '',
        end: '',
        completed: 'IN_PROGRESS',
    });
    const [addSubTask, setAddSubTask] = useState(false);
    console.log(taskInputFields);

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
                <FormInput
                    label="Date"
                    type="date"
                    name="date"
                    value={validateDate(taskInputFields.date)}
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
                <button
                    type="button"
                    onClick={() => {
                        console.log('here');
                        setAddSubTask(true);
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
                </button>

                {taskInputFields.subTasks.length &&
                    taskInputFields.subTasks.map((task, index) => {
                        return (
                            // one subtaskline
                            <div>
                                <FormInput
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
        return postTask(taskInputFields).then((task: Task) => {
            setOpenForm?.(false);
            setTasks?.((prev) => [...prev, task]);
        });
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event.target.name;

        if (name === 'date') {
            setTaskInputFields({
                ...taskInputFields,
                date: parseISO(event.target.value),
            });
        } else {
            setTaskInputFields((prev) => ({
                ...prev,
                [name]: event.target.value,
            }));
        }
    }
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
