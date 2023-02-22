import { List, SubTask } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../database/db';

//Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    const data = await prisma.task.findMany({
        orderBy: {
            start: 'asc',
        },
        include: {
            subTasks: {
                orderBy: {
                    start: 'asc',
                },
            },
            list: true,
        },
    });
    // since i added date field to subtask later, i need to assign the dates //TODO add date in schema
    const tasks = data.map((task) => {
        if (task.subTasks.length) {
            task.subTasks.forEach((subTask) => {
                subTask.date = task.date;
            });
        }
        return task;
    });

    res.json({ data: tasks });
};

//Get one task
export const getTask = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await prisma.task.findFirst({
        where: {
            id,
        },
        include: {
            subTasks: true,
            list: true,
        },
    });
    res.json({ data: task });
};

//create task
export const createTask = async (req: Request, res: Response) => {
    const subTasksToCreate = req.body?.subTasks.map((subTask: typeof req.body) => {
        return {
            date: new Date(req.body.date),
            description: subTask.description,
            start: subTask.start,
            end: subTask.end,
            status: subTask.status,
        };
    });
    const newTask = await prisma.task.create({
        data: {
            date: new Date(req.body.date),
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            subTasks: {
                create: subTasksToCreate,
            },
        },
        include: {
            subTasks: true,
            list: true,
        },
    });
    res.json({ data: newTask });
};

//update task with related records
export const updateTask = async (req: Request, res: Response) => {
    const subtasks = [...req.body.subTasks];
    const list = [...req.body.list];
    subtasks.sort((a, b) => {
        return a.start! > b.start! ? 1 : -1;
    });

    const listToUpdate = createUpdateFunction<List>(['description', 'status'], list);
    const subTasksToUpdate = createUpdateFunction<SubTask>(['description', 'start', 'end', 'status'], subtasks);

    const subTasksToCreate = subtasks.filter((subTask: typeof req.body) => !subTask.id);
    const listToCreate = list.filter((listItem: typeof req.body) => !listItem.id);

    const updatedTask = await prisma.task.update({
        where: {
            id: req.params.id,
        },
        data: {
            date: new Date(req.body.date),
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            status: req.body.status,
            subTasks: {
                update: subTasksToUpdate.length ? subTasksToUpdate : [],
                create: subTasksToCreate,
            },
            list: {
                update: listToUpdate.length ? listToUpdate : [],
                create: listToCreate,
            },
        },
        include: {
            subTasks: true,
            list: true,
        },
    });

    res.json({ data: updatedTask });
};

//delete task
export const deleteTask = async (req: Request, res: Response) => {
    const deletedTask = await prisma.task.delete({
        where: {
            id: req.params.id,
        },
    });
    res.json({ data: deletedTask });
};
//delete subtask
export const deleteSubTask = async (req: Request, res: Response) => {
    const deletedSubtask = await prisma.subTask.delete({
        where: {
            id: req.params.id,
        },
    });
    res.json({ data: deletedSubtask });
};

type UpdateProps<T> = {
    data: Partial<T>;
    where: {
        id: string;
    };
};
function createUpdateFunction<T extends { id?: string }>(propsToUpdate: (keyof T)[], items: T[]) {
    return items
        .filter((item) => item.id)
        .map((item) => {
            console.log('id', item, item.id);
            const dataToUpdate = propsToUpdate.reduce((data, prop) => {
                return { ...data, [prop]: item[prop] };
            }, {});
            return {
                data: dataToUpdate,
                where: { id: item.id },
            };
        });
}
