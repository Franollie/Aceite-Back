import getPool from "../database/getPool.js";
import generateErrorsUtils from "../utils/generateErrorsUtils.js";

const cartAddProductService = async ({ userId, productSizeId, quantity }) => {
  const pool = await getPool();
  try {
    // Verificar si existe un carrito para el usuario
    const [carts] = await pool.query(
      'SELECT * FROM cart WHERE user_id = ? AND status = "in progress"',
      [userId]
    );

    if (carts.length > 0) {
      const cart = carts[0];
      // Verificar si el producto ya está en el carrito
      const [items] = await pool.query(
        "SELECT * FROM product_cart WHERE cart_id = ? AND product_size_id = ?",
        [cart.id, productSizeId]
      );

      if (items.length > 0) {
        // Producto ya en el carrito, actualizar la cantidad
        await pool.query(
          "UPDATE product_cart SET amount = amount + ? WHERE id = ?",
          [quantity, items[0].id]
        );
      } else {
        // Producto no está en el carrito, agregarlo
        await pool.query(
          "INSERT INTO product_cart (cart_id, product_size_id, amount) VALUES (?, ?, ?)",
          [cart.id, productSizeId, quantity]
        );
      }
    } else {
      // Crear un nuevo carrito para el usuario
      const [result] = await pool.query(
        'INSERT INTO cart (user_id, status) VALUES (?, "in progress")',
        [userId]
      );
      const cartId = result.insertId;
      await pool.query(
        "INSERT INTO product_cart (cart_id, product_size_id, amount) VALUES (?, ?, ?)",
        [cartId, productSizeId, quantity]
      );
    }

    res.send({
      status: "ok",
      message: "añadido al carrito",
    });
  } catch (error) {
    console.error("Error al añadir producto al carrito:", error);
    throw generateErrorsUtils("Error al añadir producto al carrito", 500);
  }
};

export default cartAddProductService;
