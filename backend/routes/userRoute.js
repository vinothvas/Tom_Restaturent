import express from 'express';
import { adminLogin } from '../controllers/userController.js';

const useRouter = express.Router();

useRouter.post('/admin', adminLogin)

export default useRouter;