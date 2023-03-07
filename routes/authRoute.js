import express from "express";
import {registerController, loginController, forgotPasswordController} from "../controllers/authController.js";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST | Login
router.post('/login', loginController)

//Forgot Password | post
router.post('/forgot-password', forgotPasswordController)

// POST | Register
router.post('/register', registerController)

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})


export default router;