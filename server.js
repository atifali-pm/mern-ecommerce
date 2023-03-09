import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import 'colors';
import connectDb from './config/config.js';
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";


// dotenv config
dotenv.config();

connectDb();
// rest object
const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"))

// //routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`.bgCyan.green)
})
