import listCategoriesService from "../../services/products/ListCategoriesService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const listCategoriesController = async (req, res, next) => {
  try {
    const categories = await listCategoriesService();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error en el controlador:", err);
    throw generateErrorsUtils("error en el controlador", 400);
  }
};

export default listCategoriesController;
