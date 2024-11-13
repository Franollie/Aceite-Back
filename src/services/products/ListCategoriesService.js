import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const listCategoriesService = async () => {
  const pool = await getPool();
  const query = "SELECT * FROM category";

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener las categorías:", err);
        reject(generateErrorsUtils("error al obtener las categorias", 500));
      } else {
        resolve(results);
      }
    });
  });
};

export default listCategoriesService;
