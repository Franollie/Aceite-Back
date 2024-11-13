import express from "express";
import authUser from "../middlewares/authUser.js";
import adminUser from "../middlewares/adminUser.js";
import newProductController from "../controllers/products/newProductController.js";

const productRouter = express.Router();

productRouter.post("/newproduct", authUser, adminUser, newProductController);

export default productRouter;
