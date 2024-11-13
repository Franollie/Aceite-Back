import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import cartListService from "../../services/cart/cartListService.js";

const cartList = async (req, res, next) => {
  try {
    const { userId } = req.user; // Asegúrate de que req.user sea donde obtienes el userId

    // Obtener el carrito del usuario
    const cart = await cartListService(userId);

    // Enviar respuesta con los detalles del carrito
    res.status(200).json({
      status: "ok",
      message: "Procede al pago",
      cart: {
        items,
        total,
      },
    });
  } catch (error) {
    next(generateErrorsUtils); // Pasar el error al middleware de manejo de errores
  }
};

export default cartList;
