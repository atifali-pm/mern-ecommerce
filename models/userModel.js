import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required and should be unique'],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        phone: {
            type: String,
            required: [true, "Phone is required"]
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        role: {
            type: Number,
            default: 0,
        }

    },
    {
        timestamp: true
    })

export default mongoose.model('users', userSchema);