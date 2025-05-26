import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port on http://127.0.0.1:${PORT}`);
});


// import express from 'express';
// import dotenv from 'dotenv';
// import { AppDataSource } from './data-source';
// import authRoutes from './routes/auth';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use('/api', authRoutes);

// const PORT = process.env.PORT || 5000;

// AppDataSource.initialize()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Data Source init error', err);
//   });
