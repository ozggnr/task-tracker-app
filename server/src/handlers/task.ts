import { Request, Response } from 'express';
import prisma from '../database/db';

//Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json({ data: tasks });
};
