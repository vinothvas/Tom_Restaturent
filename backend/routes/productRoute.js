import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const productRouter = express.Router();

productRouter.post('/add',adminAuth, upload.single('image'), addProduct)
productRouter.post('/update', adminAuth, upload.single('image'), updateProduct);
productRouter.post('/remove',adminAuth,  removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProduct)

export default productRouter;