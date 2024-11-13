import Product from "../models/Product.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const productDetailController = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // si la peticin no los hace admin, no devolver un producto desactivado

    // Buscar el producto en la base de datos
    // con JOIN a product_size
    const product = await Product.findById(productId);

    // Verificar si el producto existe
    if (!product) {
      throw generateErrorsUtils("Producto no encontrado", 404);
    }

    // Responder con los detalles del producto
    res.send({
      status: "ok",
      message: "Detalles del producto obtenidos correctamente",
      product: {
        id: product._id,
        name: product.name,
        description: product.description,
        images: [],
        category: [],
        product_size: [{ id, size, stock, cost }],
        // Cualquier otra información relevante del producto
      },
    });
  } catch (error) {
    next(error);
  }
};

export default productDetailController;
