import orderController from "../controllers/orderController.js";
import selectUserByIdService from "../users/selectUserByIdService.js"; // Corregido "sevices" a "services"
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const cartListService = async (req, res, next) => {
  const user = await selectUserByIdService(userId);
  if (!user) {
    throw generateErrorsUtils("Usuario no encontrado", 404);
  }
  const { userId } = req.user; // Asegúrate de que req.user sea donde obtienes el userId

  // Obtener el carrito del usuario
  const cart = await orderController.getOrderByUserId(userId);

  if (!cart || cart.items.length === 0) {
    throw generateErrorsUtils(
      "Carrito vacío o no encontrado",
      404 // Código de estado para recurso no encontrado
    );
  }

  // Calcular subtotal y total del carrito
  let total = 0;
  const items = cart.items.map((item) => {
    const subtotal = item.quantity * item.product.price;
    total += subtotal;

    return {
      productId: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      subtotal,
    };
  });

  // Enviar respuesta con los detalles del carrito
  res.status(200).json({
    status: "ok",
    message: "Procede al pago",
    cart: {
      items,
      total,
    },
  });
};

export default cartListService;
