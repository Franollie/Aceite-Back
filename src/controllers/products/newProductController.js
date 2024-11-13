import newProductService from "../../services/products/newProductService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const newProductController = async (req, res, next) => {
  try {
    const { product_name, product_description, size, price } = req.body;

    await newProductService({
      product_name,
      product_description,
      size,
      price,
    });

    res.status(201).json({
      status: "ok",
      data: "Producto y tamaño añadidos a la base de datos",
    });
  } catch (err) {
    console.error("Error en el controlador:", err);
    next(err);
  }
};

export default newProductController;
