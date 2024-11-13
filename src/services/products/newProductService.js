import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const newProductService = async ({
  product_name,
  product_description,
  size,
  cost,
}) => {
  const pool = await getPool();

  try {
    await pool.beginTransaction();

    const productsQuery = `
      INSERT INTO products (product_name, product_description)
      VALUES (?, ?)
    `;
    await pool.query(productsQuery, [product_name, product_description]);

    const productSizeQuery = `
      INSERT INTO product_size (size, price)
      VALUES (?, ?)
    `;
    await pool.query(productSizeQuery, [size, price]);

    await pool.commit();
  } catch (err) {
    await pool.rollback();
    console.error("Error al realizar la transacción:", err);
    throw generateErrorsUtils("error al realizar la transacción", 500);
  }
};

export default newProductService;
