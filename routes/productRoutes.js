import express from "express";
import {isAdmin, requireSignIn} from "./../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
    createProductController,
    getSingleProductController,
    productController
} from "../controllers/productController.js";

const router = express.Router();

//routes
// create category
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

router.get('/get-product', productController);

router.get('/get-product/:slug', getSingleProductController);
export default router;