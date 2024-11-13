import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByIdService from "../../services/users/selectUserByIdService.js";

const editUserPasswordServise = async (userId, oldPassword, newPassword) => {
  const pool = await getPool();

  // Buscar al usuario
  const user = await selectUserByIdService(userId);
  if (!user) {
    throw generateErrorsUtils("Usuario no encontrado", 404);
  }

  // Verificar la contraseña anterior
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw generateErrorsUtils("Contraseña incorrecta", 400);
  }

  // Encriptar la nueva contraseña
  const hashPassword = await bcrypt.hash(newPassword, 10);

  // Guardar los cambios
  await pool.query(
    `
        UPDATE users
        SET password=?
        WHERE id=?
        `,
    [hashPassword, userId]
  );
};

export default editUserPasswordServise;
