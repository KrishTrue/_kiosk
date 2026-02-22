import express from 'express';
import connectDb from './config/DB.js';
import kioskRoutes from './routes/Kiosk.routes.js';
import buildingRoutes from './routes/Building.routes.js';
import announcementRoutes from './routes/Announcement.routes.js';

const app = express();
connectDb();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});
app.use('/api/kiosk', kioskRoutes);
app.use('/api/building', buildingRoutes);
app.use('/api/announcement',announcementRoutes)

export default app;
