import { useEffect, useState } from 'react';
import { getTasks } from '../../services/taskService';
import { Task } from '../../Types';
import { longDateFormat } from '../../utils/dateHelpers';
import Button from '../button/Button';
import { TaskComponent } from '../task/TaskComponent';
import { TaskForm } from '../task/TaskForm';
import { DayContainer } from './DailyTasks.style';
import { Row } from '../../App.style';
import { AddIcon } from '../button/Icon.style';
import Sidebar from '../sidebar/Sidebar';

interface Props {
    day: string;
}
export const DailyTasks = ({ day }: Props) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        getTasks().then((tasks) => setTasks(tasks));
    }, []);

    const dailyTasks = getDailyTasks(day);

    return (
        <DayContainer>
            <Row end>
                <Button onClick={() => setOpenForm(true)}>
                    <AddIcon />
                    Add Task
                </Button>
            </Row>
            {openForm && (
                <Sidebar onClick={() => setOpenForm(false)}>
                    <TaskForm />
                </Sidebar>
            )}

            {dailyTasks.map((task) => {
                return <TaskComponent task={task} />;
            })}
        </DayContainer>
    );

    function getDailyTasks(selectedDay: string) {
        return tasks.filter(
            (task) => longDateFormat(task.date) === selectedDay
        );
    }
};
