import getPool from "../../database/getPool.js";
import sendMailUtils from "../../utils/sendMailUtils.js";

const updateRecoverPassService = async (email, recoverPassCode) => {
  const pool = await getPool();

  await pool.query(
    `
            UPDATE users
            SET recoverPassCode=?
            WHERE email=?
        `,
    [recoverPassCode, email]
  );

  const emailSubject = "Recuperación de contraseña de Ecoil";

  const emailBody = `
                
                        Recuperación de contraseña para: ${email}
                            
                        Se ha solicitado la recuperación de contraseña en Ecoil.
                            
                         Utiliza el siquiente código de recuperación para crear una nueva contrasaeña:
                           
                          Codigo de recuperación: ${recoverPassCode}

                            Si no lo has realizado, ignora este email
                        
                            Equipo Ecoil ❤
        `;

  await sendMailUtils(email, emailSubject, emailBody);
};

export default updateRecoverPassService;
