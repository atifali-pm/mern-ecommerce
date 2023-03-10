import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";

export const createProductController = async (req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({error: "Name is Required"});
            case !description:
                return res.status(500).send({error: "Description is Required"});
            case !price:
                return res.status(500).send({error: "Price is Required"});
            case !category:
                return res.status(500).send({error: "Category is Required"});
            case !quantity:
                return res.status(500).send({error: "Quantity is Required"});
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({error: "photo is Required and should be less then 1mb"});
        }

        const products = new productModel({...req.fields, slug: slugify(name)});
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product",
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const {name, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({error: "Name is Required"});
            case !description:
                return res.status(500).send({error: "Description is Required"});
            case !price:
                return res.status(500).send({error: "Price is Required"});
            case !category:
                return res.status(500).send({error: "Category is Required"});
            case !quantity:
                return res.status(500).send({error: "Quantity is Required"});
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({error: "photo is Required and should be less then 1mb"});
        }

        const products = new productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug: slugify(name)},
            {new: true}
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product",
        });
    }
};

// get all products
export const productController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "All Products List",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({slug: req.params.slug}).populate('category').select("-photo");
        res.status(200).send({
            success: true,
            message: "Get Single Category Product Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single product",
        });
    }
};

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting product photo",
        });
    }
};


export const deleteProductController = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting category",
            error,
        });
    }
};
