import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const selectUserByIdService = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
        select id, first_name, surname, email
        from users
        where id=?
        `,
    [userId]
  );

  if (!user.length) {
    throw generateErrorsUtils("el usuario no existe", 404);
  }

  return user[0];
};

export default selectUserByIdService;
