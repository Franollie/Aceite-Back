import express from "express";
import listCategoriesController from "../controllers/products/ListCategoriesController.js";

const cartRouter = express.Router();

cartRouter.get("/cart/categories", listCategoriesController);

export default cartRouter;
