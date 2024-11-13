import express from "express";
import morgan from "morgan";
import fileupload from "express-fileupload";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productRouter from "./routes/productRouter.js";

const server = express();

server.use((req, res, next) => {
  console.log("Solicitud recibida " + new Date());

  next();
});

//middleware a nivel de aplicación

server.use(morgan("dev"));

server.use(express.json()); //codifica todo lo que viene desde un formulario y viene por body

server.use(cors());

//implementar el middleware para subir archivos
server.use(fileupload());

//implementar una ruta estática para ser usada desde el front
//para pedir el envío de una imagen o cualquier archivo estático
const staticDir = path.join(process.cwd(), "./src/uploads");
server.use("/uploads", express.static(staticDir));

// Hacer que cree la carpeta 'uploads' al arrancar el servidor si no existe.

//const uploadsDir = path.join(staticDir, "uploads");

// async function createUploadsDir() {
//   try {
//     await fs.mkdir(uploadsDir, { recursive: true });
//     console.log('Carpeta "uploads" verificada/creada');
//   } catch (error) {
//     console.error("Error al crear la carpeta 'uploads':", error);
//   }
// }

createUploadsDir();

//server.post --> crea un nuevo recurso
//server.put --> modifica un recurso ya creado
//server.delete --> elimina un recurso

server.use("/users", userRouter);
server.use("/cart", cartRouter);
server.use("/products", productRouter);

//middleware de manejo de errores
server.use((error, req, res, next) => {
  console.log(error);

  res.status(error.httpStatus || 500).send({
    status: "error!!!",
    message: error.message,
  });
});

//middelware de ruta no encontrada
server.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not Found",
  });
});

export default server;
