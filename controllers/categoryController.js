import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const {name, slug} = req.body
        //validations:
        if (!name) {
            return res.status(401).send({message: 'Name is required'})
        }

        // Existing user
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category already added!'
            })
        }

        const user = await new categoryModel({name, slug: slugify(name)}).save()
        return res.status(201).send({
            success: true,
            message: 'Category added successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating category',
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        //validations:
        if (!name) {
            return res.status(401).send({message: 'Name is required'})
        }

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})
        return res.status(201).send({
            success: true,
            message: 'Category updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating category',
            error
        })
    }
}

export const getAllCategoriesController = async (req, res) => {
    try {

        const categories = await categoryModel.find({})
        return res.status(200).send({
            success: true,
            message: 'All categories list',
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in retrieving categories',
            error
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {

        const {id} = req.params
        const category = await categoryModel.findOne({slug: req.params.slug})
        if (!category) {
            return res.status(404).send({success: false, message: 'Category not found'})

        }
        return res.status(200).send({
            success: true,
            message: 'Category retrieved',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in retrieving category',
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {

        const {id} = req.params

        const categories = await categoryModel.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting categories',
            error
        })
    }
}