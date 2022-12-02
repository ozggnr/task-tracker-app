import { FormEvent, useState, ChangeEvent } from 'react';
import { Task } from '../../Types';
import { FormInput } from '../form/FormInput';
import { TaskFormContainer } from './TaskForm.style';
import { postTask } from '../../services/taskService';
import { longDateFormat } from '../../utils/dateHelpers';
import { parseISO, formatISO } from 'date-fns';
import { Row } from '../../App.style';
import { ButtonGroup } from '../button/Button.style';

export const TaskForm = () => {
    const [taskInputFields, setTaskInputFields] = useState<Task>({
        date: new Date(),
        title: '',
        description: '',
        start: '',
        end: '',
        completed: 'IN_PROGRESS',
    });
    // console.log(taskInputFields);
    return (
        <TaskFormContainer onSubmit={handleFormSubmit}>
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
                value={formatISO(taskInputFields.date, {
                    representation: 'date',
                })}
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
                name="start"
                value={taskInputFields.end}
                onChange={handleChange}
            />
            {/* </Row> */}
            <ButtonGroup>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </ButtonGroup>
        </TaskFormContainer>
    );

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault();

        postTask(taskInputFields);
    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const name = event.target.name;
        if (name === 'date') {
            setTaskInputFields({
                ...taskInputFields,
                date: parseISO(event.target.value),
            });
        } else
            setTaskInputFields({
                ...taskInputFields,
                [name]: event.target.value,
            });
    }
    function handleCancel() {
        console.log('cancelled');
    }
};
