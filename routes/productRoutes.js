import express from "express";
import {isAdmin, requireSignIn} from "./../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
    createProductController, deleteProductController,
    getSingleProductController,
    productController, productPhotoController, updateProductController
} from "../controllers/productController.js";
import {deleteCategoryCOntroller} from "../controllers/categoryController.js";

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

router.put(
    "/update-product/:id",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

router.get('/get-product', productController);

router.get('/get-product/:slug', getSingleProductController);
router.get('/product-photo/:pid', productPhotoController);

//delete category
router.delete("/product/:id", deleteProductController);

export default router;