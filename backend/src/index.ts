import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'test' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});