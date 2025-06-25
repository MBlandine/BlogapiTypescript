import express from 'express';
import cors from 'cors';
import auth from './routes/auth';
import post from './routes/post';

const app = express();

// Add CORS middleware

app.use(express.json());
app.use(cors({
    // origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    // credentials: true
  }));
app.use('/api/auth', auth);
app.use('/api/posts', post);

export default app;