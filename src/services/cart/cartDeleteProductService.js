import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const cartDeleteProductService = async (userId, productId) => {
    const pool = await getPool();

    // 1: Obtener el carrito del usuario
    const [cart] = await pool.query(
        "SELECT * FROM carts WHERE user_id = ?",
        [userId]
    );

    if (!cart.length) {
        throw generateErrorsUtils('Carrito no encontrado', 404);
    }

    // 2: Verificar si el producto está en el carrito
    const [cartItems] = await pool.query(
        "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cart[0].id, productId]
    );

    if (!cartItems.length) {
        throw generateErrorsUtils('Producto no encontrado en el carrito', 404);
    }

    // 3: Eliminar el producto del carrito
    await pool.query(
        "DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?",
        [cart[0].id, productId]
    );

    return cart[0]; // Retorna el carrito actualizado, si es necesario
};

export default cartDeleteProductService;
