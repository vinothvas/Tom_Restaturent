import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("File Info:", req.file);

    const { name, price, description, category, popular } = req.body;

    // const image = req.file;

    // const imageUrl = await cloudinary.uploader.upload(image.path, { resource_type: "image" }).then(res => res.secure_url);

    let imageUrl = "";

    if (req.file && req.file.path) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = uploadRes.secure_url;
    }
   
   
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const productData = {
      name,
      price,
      description,
      category,
      image: imageUrl,
      popular: popular === "true",
      data: Date.now(),
    };

    console.log("Product Data:", productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.json({ success: false, message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id, name, price, description, category, popular } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const updateData = {
      name,
      price,
      description,
      category,
      popular: popular === "true",
      updatedAt: Date.now(),
    };

    // If a new image is uploaded
    if (req.file) {
      const cloudinaryRes = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = cloudinaryRes.secure_url;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.json({ success: false, message: error.message });
  }
};


const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error listing products:", error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, singleProduct, listProduct, updateProduct };
