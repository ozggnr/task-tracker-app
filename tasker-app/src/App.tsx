// import '@fullcalendar/react/dist/vdom';
import { useState, useEffect, FormEvent, MouseEvent, ChangeEvent, } from 'react';
import moment from 'moment';
import './App.css'
import { Calendar } from './components/Calendar';
import { Task } from './Types';

function App() {
  const [openForm, setOpenForm] = useState(false)
  
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
      fetch('/tasks.json').then(response => response.json()).then(data => setAllTasks(data))
  },[])
  console.log(allTasks)
  return (<>
      <Calendar tasks={allTasks}/>
  </>)
 
}

export default App


