import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import sendMailUtils from "../../utils/sendMailUtils.js";

const insertUserServices = async (email, password, registrationCode) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
                SELECT id FROM users WHERE email=?
            `,
    [email]
  );

  if (user.length)
    throw generateErrorsUtils("El email ya se encuentra registrado", 409);

  /**
   * Metodo para envío del email para confirmar el registro
   * borra el codigo de registro y el active lo pone en 1
   */

  const emailSubject = "Activa tu cuenta en Ecoil";

  const emailBody = `
                      ¡¡Bienvenid@ ${email}
                      
                      Gracias por registrarte en Ecoil.

                      Para activiar tu cuenta haz click en el siguiente enlace:
                          href="http://localhost:3001/users/validate/${registrationCode}

                          "Activar Cuenta"
                        
                       Equipo Ecoil ❤      
        `;

  await sendMailUtils(email, emailSubject, emailBody);

  const passwordHashed = await bcrypt.hash(password, 10);

  await pool.query(
    `
                INSERT INTO users (email, password, registrationCode)
                VALUES (?,?,?)
            `,
    [email, passwordHashed, registrationCode]
  );
};

export default insertUserServices;
