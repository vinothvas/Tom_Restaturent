import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    popular:{
      type: Boolean,
    },
    data: {
      type: Number,
      required: true,
    },
  },
);
const productModel = mongoose.model.product || mongoose.model("product", productSchema);
export default productModel;