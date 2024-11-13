import cartAddProductService from "../services/cart/cartAddProductService.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const cartAddProductController = async (req, res, next) => {
  try {
    const { userId, productSizeId, quantity } = req.body;

    const response = await cartAddProductService({
      userId,
      productSizeId,
      quantity,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error en el controlador:", error);
    next(generateErrorsUtils(error.message, 500));
  }
};

export default cartAddProductController;
