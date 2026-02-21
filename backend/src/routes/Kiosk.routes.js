import express from "express";
import { registerKiosk } from "../controller/Kiosk.cotnroller.js";

const router=express.Router()


router.post('/add',registerKiosk)


export default router;