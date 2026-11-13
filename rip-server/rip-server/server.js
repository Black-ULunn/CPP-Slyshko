import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './services/db.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});
app.get('/', (req, res) => {
  res.send('RIP API працює');
});

app.use('/api/applications', applicationRoutes);

connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
