import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10, // Establece un límite máximo de conexiones. Por defecto 10.
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z", // El valor Z establece la zona horaria como UTC.
      });
    }

    // Retorna el pool de conexiones.
    return pool;
  } catch (err) {
    console.error(err);
  }
};

// Exporta la función "getPool" para usarla en otros archivos de tu proyecto.
export default getPool;
