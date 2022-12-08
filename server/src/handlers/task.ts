import { Request, Response } from 'express';
import prisma from '../database/db';

//Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany({
        include: {
            subTasks: true,
        },
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
    const newTask = await prisma.task.create({
        data: {
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            subTasks: {
                create: [
                    {
                        description: req.body.subTasks?.description,
                        start: req.body.subTasks?.start,
                        end: req.body.subTasks?.end,
                    },
                ],
            },
        },
    });
    res.json({ data: newTask });
};

//update task
export const updateTask = async (req: Request, res: Response) => {
    const updatedTask = await prisma.task.update({
        where: {
            id: req.params.id,
        },
        data: {
            date: req.body.date,
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            subTasks: {
                create: [
                    {
                        description: req.body.subTasks?.description,
                        start: req.body.subTasks?.start,
                        end: req.body.subTasks?.end,
                    },
                ],
            },
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
