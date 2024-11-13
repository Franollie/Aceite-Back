import Product from "../models/Product.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const productListController = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    // Crear el objeto de filtros
    let filters = {};

    if (search) {
      filters.name = { $regex: search, $options: "i" }; // Búsqueda insensible a mayúsculas
    }
    if (category) {
      filters.category = category;
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    // Definir el criterio de ordenación
    let sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    // si la peticin no los hace admin, no devolver los producto desactivados

    // Ejecutar la consulta en la base de datos con filtros y ordenación
    const products = await Product.find(filters).sort(sortOptions);

    res.send({
      status: "ok",
      message: "Lista de productos obtenida correctamente",
      products,
    });
  } catch (error) {
    next(error);
  }
};

export default productListController;
