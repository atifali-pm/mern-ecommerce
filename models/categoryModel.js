import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true
        }
    },
    {
        timestamp: true
    })

export default mongoose.model('Category', categorySchema);