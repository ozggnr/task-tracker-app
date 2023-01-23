import { SubTask } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../database/db';

//Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    const data = await prisma.task.findMany({
        include: {
            subTasks: {
                orderBy: {
                    start: 'asc',
                },
            },
        },
    });
    // since i added date field to subtask later, i need to assign the dates //TODO add date in schema
    const tasks = data.map((task) => {
        if (task.subTasks.length > 0) {
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
        },
    });
    res.json({ data: task });
};

//create task
export const createTask = async (req: Request, res: Response) => {
    const subTasksToCreate = req.body?.subTasks.map((task: typeof req.body) => {
        return {
            date: new Date(req.body.date),
            description: task.description,
            start: task.start,
            end: task.end,
            status: task.status,
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
        },
    });
    res.json({ data: newTask });
};

//update task with related records
export const updateTask = async (req: Request, res: Response) => {
    type UpdateProps = {
        data: {};
        where: {
            id: string;
        };
    };

    const subTasksToUpdate = req.body?.subTasks.reduce((props: UpdateProps[], subTask: SubTask) => {
        if (subTask.id) {
            const obj: UpdateProps = {
                data: {
                    date: new Date(req.body.date),
                    description: subTask.description,
                    start: subTask.start,
                    end: subTask.end,
                    status: subTask.status,
                },
                where: {
                    id: subTask.id,
                },
            };
            props.push(obj);
        }
        return props;
    }, []);

    const subTasksToCreate = req.body?.subTasks.filter((task: typeof req.body) => !task.id);

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
        },
        include: {
            subTasks: true,
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
