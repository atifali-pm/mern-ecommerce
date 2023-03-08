import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";
import {
    createCategoryController, deleteCategoryController,
    getAllCategoriesController, singleCategoryController,
    updateCategoryController
} from "../controllers/categoryController.js";

const router = express.Router();

router.post('/', requireSignIn, isAdmin, createCategoryController)

router.put('/:id', requireSignIn, isAdmin, updateCategoryController)

router.get('/', requireSignIn, isAdmin, getAllCategoriesController)

router.get('/:slug', requireSignIn, isAdmin, singleCategoryController)

router.delete('/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;