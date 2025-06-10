import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import useRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    connectCloudinary();

    app.use(express.json());
    app.use(cors());

    // API routes
    app.use("/api/user", useRouter);
    app.use("/api/product", productRouter);

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // Start server AFTER DB connection is successful
    app.listen(port, () => {
      console.log(`✅ Server listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
};

startServer();
