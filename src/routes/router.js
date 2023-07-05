import { Router } from "express";
import authController from "../controllers/authController.js";
import { createRepuesto, getRepuesto, updateRepuesto, deleteRepuesto } from "../controllers/productsController.js";


const router = Router()

router.use("/auth", authController)
export default router