import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import useRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", useRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
