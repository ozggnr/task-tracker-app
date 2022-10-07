import moment from "moment";
import { FunctionComponent } from "react";

interface Task {
    id: number,
    date: string,
    title: string,
    desc: string,
    start: string,
    end: string,
    completed: boolean,
    repeat: string
}
const TaskPage: FunctionComponent<{tasks: Task[], className: string}> = (props) => {
  console.log(props)
    const { tasks } = props;
    
    return <div className='daily-tasks-page'>
    {tasks.map(task => {
        return <div className='task'>
          <div className='task-time'>{task.start}</div>
          <div className='task-def'>
            <div className='task-title'>{task.title}</div>
            <div className='task-desc'>{task.desc}</div>
          </div>
        </div>})}
      </div>
}
export default TaskPage;