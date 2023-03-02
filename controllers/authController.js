import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Email or password is invalid'
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not found'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).send({
                success: false,
                message: 'Invalid password'
            })
        }

        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.status(200).send({
            success: true,
            message: 'Login successfully!',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}
export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body
        //validations:
        if (!name) {
            return res.send({error: 'Name is required'})
        }
        if (!email) {
            return res.send({error: 'Email is required'})
        }
        if (!password) {
            return res.send({error: 'password is required'})
        }
        if (!phone) {
            return res.send({error: 'phone is required'})
        }
        if (!address) {
            return res.send({error: 'address is required'})
        }

        // Existing user
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User with the email/password already registered'
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name, email, password: hashedPassword, phone, address}).save()
        return res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}


