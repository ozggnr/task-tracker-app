import { Prisma } from '@prisma/client';
import prisma from './db';

const taskData: Prisma.TaskCreateInput[] = [
  {
    date: new Date('17 November 2022'),
    title: 'Workout',
    description: '',
    start: '8:30',
    end: '9:00',
  },
  {
    date: new Date('23 October 2022'),
    title: 'House',
    description: 'Rearrange closet',
    start: '12:30',
    end: '14:00',
  },
  {
    date: new Date('03 November 2022'),
    title: 'Shopping',
    description: 'Go to grocery store',
    start: '17:30',
    end: '18:30',
  },
  {
    date: new Date('13 November 2022'),
    title: 'Coding',
    description: 'Complete react lesson',
    start: '9:00',
    end: '11:00',
  },
];

const insertTask = async () => {
  for (const task of taskData) {
    const createdTask = await prisma.task.create({
      data: task,
    });
  }
};

insertTask()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
