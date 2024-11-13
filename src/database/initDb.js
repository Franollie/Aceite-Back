import getPool from "./getPool.js";

const initDb = async () => {
  try {
    let pool = await getPool();
    console.log("Eliminando base de datos...");
    await pool.query("DROP DATABASE IF EXISTS ecoil");
    console.log("Creando base de datos diary...");
    await pool.query("CREATE DATABASE ecoil");
    await pool.query("USE ecoil");
    console.log("Borrando tablas...");
    await pool.query(
      "DROP TABLE IF EXISTS telephone_prefix, direction, users, products, product_size, photos, category, product_category, orders, product_order, rating"
    );
    console.log("Creando tablas...");
    await pool.query(`CREATE TABLE telephone_prefix (
        id INT PRIMARY KEY AUTO_INCREMENT,
        country VARCHAR(50),
        prefix VARCHAR(5) NOT NULL)`);
    await pool.query(`CREATE TABLE direction (
        id INT PRIMARY KEY AUTO_INCREMENT,
        country VARCHAR(50),
        city VARCHAR(50),
        PC VARCHAR(10), 
        direction VARCHAR(50),
        notes VARCHAR(225))`);
    await pool.query(`CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50),
        surname VARCHAR(50),
        telephone_prefix_id INT,
        telephone CHAR(9) NULL,
        direction_id INT,
        email VARCHAR(50),
        password VARCHAR(300) NOT NULL CHECK (CHAR_LENGTH(password) BETWEEN 8 AND 300),
        role ENUM('admin', 'client') DEFAULT 'client',
        active BOOLEAN DEFAULT FALSE,
        registrationcode VARCHAR(50),
        recoverpasscode VARCHAR(50),
        createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modifiedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (telephone_prefix_id) REFERENCES telephone_prefix(id),
        FOREIGN KEY (direction_id) REFERENCES direction(id))`);
    await pool.query(`CREATE TABLE products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        outstanding BOOLEAN DEFAULT TRUE,
        desactivated BOOLEAN DEFAULT FALSE,
        product_name VARCHAR(50) NOT NULL,
        product_description VARCHAR(500) NOT NULL)`);
    await pool.query(`CREATE TABLE product_size (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_id INT,
        size VARCHAR(50),
        stock INTEGER,
        price NUMERIC(10, 2),
        FOREIGN KEY (product_id) REFERENCES products(id))`);
    await pool.query(`CREATE TABLE product_image (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_image_name VARCHAR(50),
        product_image MEDIUMBLOB,
        product_id INT,
        FOREIGN KEY (product_id) REFERENCES products(id))`);
    await pool.query(`CREATE TABLE category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        categoryProd VARCHAR(50))`);
    await pool.query(`CREATE TABLE product_category (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category_id INT,
        product_id INT,
        FOREIGN KEY (category_id) REFERENCES category(id),
        OREIGN KEY (product_id) REFERENCES products(id))`);
    await pool.query(`CREATE TABLE orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        direction_delivery_id INT,
        direction_billing_id INT,
        status ENUM('in progress', 'confirmed', 'fraude', 'cancelated', 'sent'),
        carrier_url VARCHAR(50),
        carrier_tracking_code VARCHAR(50),
        bill_file MEDIUMBLOB,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        order_confirmation_date TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (direction_delivery_id) REFERENCES direction(id),
        FOREIGN KEY (direction_billing_id) REFERENCES direction(id))`);
    await pool.query(`CREATE TABLE product_order (
        id INT PRIMARY KEY AUTO_INCREMENT,
        product_size_id INT,
        amount SMALLINT DEFAULT 1,
        order_id INT,
        FOREIGN KEY (product_size_id) REFERENCES product_size(id),
        FOREIGN KEY (order_id) REFERENCES orders(id))`);
    await pool.query(`CREATE TABLE rating (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        rate ENUM('1', '2', '3', '4', '5'),
        coment VARCHAR(225),
        image MEDIUMBLOB,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id))`);
    console.log("Tablas creadas!");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

initDb();
