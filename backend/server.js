import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// App config
const app = express();
const port = process.env.PORT || 4000;
connectDb()
connectCloudinary()

// Middlewares
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(cors());

// API endpoints

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API is running");
})

app.listen(3002);
console.log("Server LIsten at Link: http://localhost:3002");

// app.listen(port, () => {
//     console.log(`Listening at http://localhost:${port}`);
// })