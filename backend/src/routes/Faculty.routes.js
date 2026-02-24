import express from 'express';
import { addFaculty, getAllFaculties, getFacultyById } from '../controller/Faculty.controller.js';

const router = express.Router();

router.post('/add', addFaculty);
router.get('/all', getAllFaculties);
router.get('/:id', getFacultyById);

export default router;
