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
    const subTasksToCreate = req.body?.subTasks.map((task: typeof req.body) => {
        return {
            description: task.description,
            start: task.start,
            end: task.end,
            status: task.status,
        };
    });
    const newTask = await prisma.task.create({
        data: {
            date: req.body.date,
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
    const obj: UpdateProps = {
        data: {},
        where: {
            id: '',
        },
    };

    const subTasksToUpdate = req.body?.subTasks.reduce(
        (props: UpdateProps[], task: typeof req.body) => {
            if (task.id) {
                obj.data = Object.assign(obj.data, {
                    description: task.description,
                    start: task.start,
                    end: task.end,
                    status: task.status,
                });
                obj.where.id = task.id;
                props.push(obj);
            }
            return props;
        },
        []
    );

    const subTasksToCreate = req.body?.subTasks.filter(
        (task: typeof req.body) => !task.id
    );

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
