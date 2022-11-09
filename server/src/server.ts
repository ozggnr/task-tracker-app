import express, { Request, Response } from 'express';
console.log(new Date('31 October 2022'));
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200);
  res.send({ message: 'Hello Server' });
});

export default app;
