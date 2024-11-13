Proyecto Final Bootcamp Hack A Boss 2024 - E-commerce - Readme.md

Este proyecto es un backend para una aplicación de e-commerce, desarrollado como proyecto final del bootcamp de Hack A Boss 2024. El backend permite la gestión de productos, carritos de compra y usuarios, con funcionalidades de autenticación, autorización y administración.

Tabla de Contenidos:
- Descripción General
- Tecnologías Utilizadas
- Configuración e instalación
- Base de Datos
- Endpoints
- Colección de Postman
  
Descripción General:
Este proyecto backend de e-commerce permite:
Registro y autenticación de usuarios.
Gestión de productos (creación, listado, y filtrado).
Manejo de carritos de compra y transacciones.
Roles de usuario y administrador para control de accesos.

Tecnologías Utilizadas:
Node.js y Express: para el desarrollo del servidor backend.
MySQL y MySQL Workbench: para la gestión de la base de datos.
Postman: para la creación y prueba de endpoints de la API.

Configuración e instalación:
En la colección de Postman, se han introducido los datos específicos de conexión para interactuar correctamente con la base de datos. Estos datos aseguran que cada endpoint pueda probarse en un entorno similar al de producción, conectándose a la base de datos MySQL configurada en el proyecto.

Base de Datos creada:
Esquema relacional adjunto en el archivo db-modelEcoil.png.
Se ha creado una base de datos relacional en MySQL. Incluye tablas para manejar usuarios, productos, categorías, y carritos de compra, con relaciones entre ellas mediante claves primarias (PK) y claves foráneas (FK).
En la base de datos MySQL, se realizó una modificación en la tabla Productos para incluir dos nuevos campos: precio e IVA. Estos campos permiten gestionar de manera más detallada el precio de los productos y calcular el valor final de cada transacción.

Endpoints implementados:
A continuación, se detallan los principales endpoints implementados.
Usuarios:
- Registro de usuario
- Validación de usuarioLogin
- Recuperación de contraseña
- Cambio de contraseña
  
Productos y Categorías:
- Lista de categorías
- Creación de un producto (solo administrador)
- Lista de productos (con filtros y ordenación)
- Detalle de producto
  
Carrito de Compra:
- Añadir producto al carrito
- Eliminar producto del carrito
- Modificar cantidad de producto en el carrito
- Lista de productos en el carrito
  
Middlewares:
- 404 Not Found
- Gestión de Errores
- Parseo del Body de la Petición
- Upload de Archivos
- Recursos estaticos
- CORS

Colección de Postman:
Hemos creado una colección en Postman con todos los endpoints implementados, la cual permite probar cada funcionalidad de la API. Esta colección incluye la configuración de los datos necesarios para conectar cada endpoint con la base de datos del proyecto y realizar pruebas completas de la API.




