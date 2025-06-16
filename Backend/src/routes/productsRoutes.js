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

const router = express.Router();

router.get("/", getProducts);
router.get("/offert", getOffert);
router.get("/featured", getFeatured);
router.post("/", upload.single("image"), newProduct);
router.delete("/:id", deleteProduct);
//rutas para la vista de administrador
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);

export default router;
