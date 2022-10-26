import { Task } from '../Types';

interface Props {
  tasks: Task[], className: string
}
const DailyTasks = (props: Props) => {
    const { tasks } = props;
    console.log(tasks)
    return <div className='daily-tasks-page'>
    {tasks.map(task => {
        return <div className='task'>
          <div className='col-1'>{task.start}</div>
          <div className='col-1'>
            <div className='task-title'>{task.title}</div>
            <div className='task-desc'>{task.desc}</div>
          </div>
        </div>})}
      </div>
}
export default DailyTasks;