import { FormEvent, useState, ChangeEvent } from 'react';
import { Task } from '../Types';
import { FormInput } from './FormInput';
import { TaskFormContainer } from './FormStyle';

export const TaskForm = () => { 
    const [taskInputFields, setTaskInputFields] = useState<Task>({
        date: "",
        title: "",
        desc: "",
        start: "",
        end: "",
        completed: false,
        repeat: ""
      })
    return <TaskFormContainer onSubmit={handleFormSubmit}>
        <FormInput label='Title' type='text' name='title' value={taskInputFields.title} onChange={handleChange} />
        <FormInput label='Description' type='text' name='desc' value={taskInputFields.desc} onChange={handleChange} />
        <FormInput label='Date' type='date' name='date' value={taskInputFields.date} onChange={handleChange} />
        <FormInput label='Time' type='time' name='start' value={taskInputFields.start} onChange={handleChange} />
        <button type='submit'>Save</button>
    </TaskFormContainer>
  
    function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        fetch('/tasks.json').then(response => response.json()).then(data => {
            data.push(taskInputFields)
        //   setAllTasks(data)
        //   console.log(data)
        })

    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const name = event.target.name
        setTaskInputFields({...taskInputFields, [name]: event.target.value})
    }
}