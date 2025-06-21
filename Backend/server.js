import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./src/routes/productsRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/product", productsRoutes);
app.use("/", userRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
  });
}
export default app;
