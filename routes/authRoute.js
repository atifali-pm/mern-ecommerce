import express from "express";
import {registerController, loginController} from "../controllers/authController.js";

const router = express.Router();

// POST | Login
router.post('/login', loginController )

// POST | Register
router.post('/register', registerController)

export default router;