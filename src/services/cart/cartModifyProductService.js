import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const cartModifyProductService = async (orderId, productSizeId, quantity, userId) => {
    const pool = await getPool();

    // 0: Comprobar que el pedido exista
    const [order] = await pool.query(
        "SELECT user_id AS userId FROM orders WHERE id = ?",
        [orderId]
    );

    if (!order.length) {
        throw generateErrorsUtils("Pedido no encontrado", 404);
    }

    // 1: Verificar si el usuario es el propietario del pedido
    if (order[0].userId !== userId) {
        throw generateErrorsUtils('Usuario no autorizado para esta operación', 403);
    }

    // 2: Buscar el producto en el pedido
    const [product] = await pool.query(
        "SELECT amount FROM product_order WHERE order_id = ? AND product_size_id = ?",
        [orderId, productSizeId]
    );

    if (!product.length) {
        throw generateErrorsUtils('Producto no encontrado en el carrito', 404);
    }

    // 3: Comprobar stock si la nueva cantidad es mayor a la actual
    if (quantity > product[0].amount) {
        const [stockCheck] = await pool.query(
            "SELECT stock FROM product_size WHERE id = ?",
            [productSizeId]
        );

        const stock = stockCheck.length ? stockCheck[0].stock : 0;

        if (stock < (quantity - product[0].amount)) {
            throw generateErrorsUtils('Cantidad solicitada supera el stock disponible', 409);
        }
    }

    // 4: Actualizar la cantidad en el carrito
    await pool.query(
        "UPDATE product_order SET amount = ? WHERE order_id = ? AND product_size_id = ?",
        [quantity, orderId, productSizeId]
    );

    // 5: Actualizar el stock en product_size
    await pool.query(
        "UPDATE product_size SET stock = stock - ? WHERE id = ?",
        [quantity - product[0].amount, productSizeId]
    );
};

export default cartModifyProductService;
