import express from 'express';
import auth from './routes/auth';
import post from './routes/post';

const app = express();

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/posts', post);

export default app;