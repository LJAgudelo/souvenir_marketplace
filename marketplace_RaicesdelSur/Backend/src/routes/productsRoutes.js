import express from "express";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  getFeatured,
  getOffert,
  newProduct,
  getProductById,
} from "../controllers/productsControllers.js";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/middlewareRoutes.js";
import adminMiddleware from "../middlewares/middlewareAdmin.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.get("/offert",authMiddleware, getOffert);
router.get("/featured",authMiddleware, getFeatured);
router.post("/", upload.single("image"),authMiddleware, newProduct);
router.delete("/:id",authMiddleware, deleteProduct);
//rutas para la vista de administrador
router.get("/:id", authMiddleware,adminMiddleware,getProductById);
router.put("/:id", upload.single("image"),authMiddleware,adminMiddleware, updateProduct);

export default router;
