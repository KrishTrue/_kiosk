import express from 'express'
import { addBuilding } from '../controller/Building.controller.js';


const router=express.Router();



router.post('/add',addBuilding)


export default router;