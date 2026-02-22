import express from 'express';
import {
  addBuilding,
  getAllBuildings,
  getBuildingById,
} from '../controller/Building.controller.js';

const router = express.Router();

router.post('/add', addBuilding);
router.get('/all', getAllBuildings);
router.get('/:id', getBuildingById);

export default router;
