import { Router } from "express";
import {  userLogin, userRegister } from "../controllers/User.controllers.js";
import { jwtAuthMiddleware } from "../middleware/Auth.middleware.js";

const router = Router();

router.post('/register',userRegister)

router.post('/login',userLogin)

// router.get('/verify',jwtAuthMiddleware,Auth)
export default router