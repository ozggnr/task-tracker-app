import '@fullcalendar/react/dist/vdom';
import { useState, useEffect, FormEvent, MouseEvent, ChangeEvent, } from 'react';
import moment from 'moment';
import './App.css'
import Calendar from './components/Calendar';
interface Task {
  id?: number,
  date: string,
  title: string,
  desc: string,
  start: string,
  end: string,
  completed: boolean,
  repeat: string
}
function App() {
  const [openForm, setOpenForm] = useState(false)
  const [taskInputFields, setTaskInputFields] = useState<Task>({
    date: "",
    title: "",
    desc: "",
    start: "",
    end: "",
    completed: false,
    repeat: ""
  })
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
      fetch('/tasks.json').then(response => response.json()).then(data => setAllTasks(data))
  },[])
  console.log(taskInputFields)
  return (<>
      <button onClick={() => setOpenForm(true)}>Create New Task</button>
      {openForm && <form onSubmit={handleSubmit}>
        <label>Task Title</label>
        <input type='text' name='title' value={taskInputFields.title} onChange={handleChange}/>
        <label>Task Description</label>
        <input type='text' name='desc' value={taskInputFields.desc} onChange={handleChange}/>
        <label>Date</label>
        <input type='date' name='date' value={taskInputFields.date} onChange={handleChange}/>
        <label>Time</label>
        <input type='time' name='start' value={taskInputFields.start} onChange={handleChange}/>
        <button type='submit'>Save</button>
        </form>}
      <Calendar tasks={allTasks}/>
  </>)
  function handleSubmit(e : FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('onSubmit', taskInputFields)
    fetch('/tasks.json').then(response => response.json()).then(data => {
      console.log(data)
      data.push(taskInputFields)
      
      setAllTasks(data)
      console.log(data)
    })

  }
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const name = event.target.name
    setTaskInputFields({...taskInputFields, [name]: event.target.value})
  }
}

export default App


