import cartController from "../controllers/cartController.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
//importar el service cuando lo suba 

// Controlador para modificar la cantidad de productos en el carrito
const cartModifyProductController = async (req, res, next) => {
  try {
    const { orderId, productSizeId, userId } = req.params; // Obtener userId y productId desde los parámetros
    const { quantity } = req.body; // Cantidad que se quiere agregar o quitar

    await cartModifyProductService (orderId, productSizeId, quantity, userId)

    res.send({
      status: "ok",
      message: "Carrito actualizado correctamente",
      data: {
        quantity,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default cartModifyProductController;
