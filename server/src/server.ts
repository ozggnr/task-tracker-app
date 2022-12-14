import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './router';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200);
    res.send({ message: 'Hello Server' });
});

app.use('/api', router);

export default app;
