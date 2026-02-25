import express from 'express';
import { createAdmin, createUser, login, registerSuperAdmin } from '../controller/Auth.controller.js';
import {auth} from '../middlewares/auth.middleware.js';

const router=express.Router()

router.post('/register-super-admin',registerSuperAdmin);
router.post('/create-admin',auth,createAdmin);
router.post('/create-user',auth,createUser);
router.post('/login',login)

export default router;