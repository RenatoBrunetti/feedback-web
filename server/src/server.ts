import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(router);

app.listen(3333, () => {
  console.log('[ Server is running ]');
});
