import express from 'express';
import connectDb from './config/DB.js';
import kioskRoutes from './routes/Kiosk.routes.js';

const app = express();
connectDb();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});
app.use('/api/kiosk',kioskRoutes)

export default app;
