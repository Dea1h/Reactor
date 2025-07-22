import { log } from "console";
import express from "express";
import fs from "fs";
import multer from "multer";
import mysql from "mysql2/promise";
import { type } from "os";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// async function initializeDatabase(database, pool) {
//   try {
//     const [rows] = await pool.query(`SHOW DATABASES LIKE '${database}';`);
//
//     if (rows.length == 0) {
//       console.log("Database doesnt exist! Creating database...");
//
//       const query = `
//       CREATE DATABASE IF NOT EXISTS ${database};
//       USE ${database};
//       CREATE TABLE product (
//         product_id INT PRIMARY KEY,
//         type TEXT NOT NULL,
//         season TEXT NOT NULL
//       );
//
//       CREATE TABLE variant (
//         variant_id INT PRIMARY KEY,
//         product_id INT,
//         variant_name TEXT NOT NULL,
//         FOREIGN KEY (product_id) REFERENCES product(product_id)
//       );
//
//       CREATE TABLE design (
//         design_id INT PRIMARY KEY,
//         variant_id INT NOT NULL,
//         design_name TEXT NOT NULL,
//         quantity INT,
//         pricei REAL NOT NULL,
//         model_image_id TEXT NOT NULL,
//         colour TEXT NOT NULL,
//         size TEXT NOT NULL,
//         min_age INT NOT NULL,
//         max_age INT NOT NULL,
//         gender TEXT NOT NULL,
//         date_added DATE NOT NULL,
//         FOREIGN KEY (variant_id) REFERENCES variant(variant_id)
//       );`;
//       await pool.query(query);
//       console.log("Database Created.");
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error("Database Initialization Or Creation Failed");
//   }
// }
// async function insertProductByParameter(database, pool, postParameter) {
//   try {
//     const query = `
//     USE ${database};
//     INSERT INTO products (
//       product_id,
//       type,
//       price,
//       min_age,
//       max_age,
//       collection,
//       priority
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);`;
//
//     await pool.query(query, [
//       postParameter.product_id || null,
//       postParameter.type || null,
//       postParameter.price || null,
//       postParameter.min_age || null,
//       postParameter.max_age || null,
//       postParameter.collection || null,
//       postParameter.priority || null,
//     ]);
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error Inserting Data Into Database");
//   }
//
//   try {
//     const query = `
//     USE ${database};
//     INSERT INTO product_variations (
//       variation_id,
//       product_id,
//       quantity,
//       model_image_id,
//       colour,
//       design,
//       size
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);`;
//     await pool.query(query, [
//       postParameter.variation_id || null,
//       postParameter.product_id || null,
//       postParameter.quantity || null,
//       postParameter.model_image_id || null,
//       postParameter.colour || null,
//       postParameter.design || null,
//       postParameter.size || null,
//     ]);
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error Inserting Data Into Database");
//   }
// }

async function initializeDatabase(database, pool) {
  try {
    const [rows] = await pool.query(`SHOW DATABASES LIKE '${database}';`);

    if (rows.length == 0) {
      console.log("Database doesnt exist! Creating database...");

      const query = `
      START TRANSACTION;
      CREATE DATABASE IF NOT EXISTS ${database};
      USE ${database};
      CREATE TABLE product (
        product_id INT PRIMARY KEY,
        type TEXT NOT NULL,
        season TEXT NOT NULL
      );

      CREATE TABLE variant (
        variant_id INT PRIMARY KEY,
        product_id INT,
        variant_name TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES product(product_id)
      );

      CREATE TABLE design (
        design_id INT PRIMARY KEY,
        variant_id INT NOT NULL,
        design_name TEXT NOT NULL,
        pricei REAL NOT NULL,
        model_image_id TEXT NOT NULL,
        colour TEXT NOT NULL,
        size TEXT NOT NULL,
        min_age INT NOT NULL,
        max_age INT NOT NULL,
        gender TEXT NOT NULL,
        date_added DATE NOT NULL,
        FOREIGN KEY (variant_id) REFERENCES variant(variant_id)
      );
      CREATE TABLE stock (
        stock_id int primary key auto_increment,
        design_id int not null,
        colour text not null,
        size_group text not null,
        size text not null,
        stock int not null,
        min_age int not null,
        max_age int not null,
        image_id text not null,
        price int not NULL
        );
        COMMIT;
      ;`;
      await pool.query(query);
      console.log("Database Created.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Database Initialization Or Creation Failed");
  }
}

class FetchParameter {
  constructor({
    type = null,
    product_id = null,
    season = null,
    variant_id = null,
    variant_name = null,
    design_id = null,
    design_name = null,
    date_added = null,
    gender = null,
    min_price = null,
    max_price = null,
    min_age = null,
    max_age = null,
    size = null,
    size_group = null,
    stock = null,
    image_id = null,
    stock_id = null,
    colour = null,
  } = {}) {
    this.type = type;
    this.product_id = product_id;
    this.season = season;
    this.variant_id = variant_id;
    this.variant_name = variant_name;
    this.design_id = design_id;
    this.design_name = design_name;
    this.date_added = date_added;
    this.gender = gender;
    this.min_price = min_price;
    this.max_price = max_price;
    this.min_age = min_age;
    this.max_age = max_age;
    this.size = size;
    this.size_group = size_group;
    this.stock = stock;
    this.image_id = image_id;
    this.stock_id = stock_id;
    this.colour = colour;
  }
}
class PostParameter {
  constructor({
    type,
    product_id,
    season,
    variant_id,
    variant_name,
    design_id,
    design_name,
    date_added,
    gender,
    price,
    min_age,
    max_age,
    size,
    size_group,
    stock,
    image_id,
    stock_id,
    colour,
  } = {}) {
    this.type = type;
    this.product_id = product_id;
    this.season = season;
    this.variant_id = variant_id;
    this.variant_name = variant_name;
    this.design_id = design_id;
    this.design_name = design_name;
    this.date_added = date_added;
    this.gender = gender;
    this.price = price;
    this.min_age = min_age;
    this.max_age = max_age;
    this.size = size;
    this.size_group = size_group;
    this.stock = stock;
    this.image_id = image_id;
    this.stock_id = stock_id;
    this.colour = colour;
  }
}

function filehandler(multer, fs, path) {
  // Directory to store images;
  const UPLOAD_DIR = "../public/images";

  // Check if upload directory exists
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  const storage = multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (request, file, callback) => {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname),
      );
    },
  });

  // Initialize upload variable
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
    fileFilter: (req, file, callback) => {
      const fileTypes = /jpeg|jpg|png/; // Allowed file extensions
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase(),
      );
      const mimetype = fileTypes.test(file.mimetype);

      if (mimetype && extname) {
        return callback(null, true);
      } else {
        callback("Error: Images Only!");
      }
    },
  });

  return upload;
}

// async function fetchDataTest(database, FetchParameter, pool) {
//   const whereClause = `
//                       SELECT
//                           p.type, p.price, p.min_age, p.max_age, p.collection,
//                           pv.model_image_id, pv.colour, pv.design, pv.quantity
//                       FROM
//                           product p
//                       JOIN
//                           product_variations pv ON p.product_id = pv.product_id
//                       WHERE
//                           LOWER(REPLACE(REPLACE(p.type,'-',''),' ','')) LIKE COALESCE(?,LOWER(REPLACE(REPLACE(p.type,'-',''),' ','')))
//                           AND p.price <= COALESCE(?, p.price)
//                           AND p.price >= COALESCE(?, p.price)
//                           AND p.min_age >= COALESCE(?, p.min_age)
//                           AND p.max_age <= COALESCE(?, p.max_age)
//                           AND p.collection = COALESCE(?, p.collection)
//                           AND p.priority = COALESCE(?, p.priority)
//                           AND pv.model_image_id = COALESCE(?, pv.model_image_id)
//                           AND pv.colour = COALESCE(?, pv.colour);
//                         `;
//
//   try {
//     await pool.query(`USE ${database};`);
//     const [rows, fields] = await pool.query(whereClause, [
//       FetchParameter.type,
//       FetchParameter.max_price,
//       FetchParameter.min_price,
//       FetchParameter.min_age,
//       FetchParameter.max_age,
//       FetchParameter.collection,
//       FetchParameter.priority,
//       FetchParameter.image_Id,
//       FetchParameter.colour,
//     ]);
//     return rows;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error Fetching Data From Database");
//   }
// }

async function fetchDataTest(database, FetchParameter, pool) {
  const whereClause = ` 
                        SELECT
                            p.type,
                            p.season,
                            d.gender,
                            d.date_added,
                            s.price,
                            s.min_age,
                            s.max_age,
                            s.stock,
                            s.image_id,
                            s.colour,
                            s.size,
                            s.size_group,
                            d.design_name,
                            v.variant_name,
                            p.product_id,
                            s.stock
                            
                        FROM design d
                        JOIN variant v ON d.variant_id = v.variant_id
                        JOIN product p ON v.product_id = p.product_id
                        JOIN stock s on s.design_id = d.design_id
                        WHERE
                            SOUNDEX(LOWER(REPLACE(REPLACE(p.type, '-', ''), ' ', ''))) = SOUNDEX(COALESCE(?, LOWER(REPLACE(REPLACE(p.type, '-', ''), ' ', ''))))
                            AND p.product_id = COALESCE(?, p.product_id)
                            AND p.season = COALESCE(?, p.season)
                            AND v.variant_id = COALESCE(?,v.variant_id)
                            AND v.variant_name = COALESCE(?, v.variant_name)
                            AND d.design_id = COALESCE(?, d.design_id)
                            AND d.design_name = COALESCE(?, d.design_name)
                            AND d.date_added >= CURDATE() - INTERVAL COALESCE(?,d.date_added) DAY
                            AND d.gender = COALESCE(?, d.gender)
                            AND s.price <= COALESCE(?, s.price)
                            AND s.price >= COALESCE(?, s.price)
                            AND s.min_age >= COALESCE(?, s.min_age)
                            AND s.max_age <= COALESCE(?, s.max_age)
                            AND s.size = COALESCE(?, s.size)
                            AND s.size_group = COALESCE(?, s.size_group)
                            AND s.stock > 0
                            AND s.image_id = COALESCE(?, s.image_id)
                            AND s.stock_id = COALESCE(?, s.stock_id)
                            AND s.colour = COALESCE(?, s.colour);
                        `;

  try {
    await pool.query(`USE ${database};`);
    const [rows] = await pool.query(whereClause, [
      FetchParameter.type,
      FetchParameter.product_id,
      FetchParameter.season,
      FetchParameter.variant_id,
      FetchParameter.variant_name,
      FetchParameter.design_id,
      FetchParameter.design_name,
      FetchParameter.date_added,
      FetchParameter.gender,
      FetchParameter.price,
      FetchParameter.price,
      FetchParameter.min_age,
      FetchParameter.max_age,
      FetchParameter.size,
      FetchParameter.size_group,
      FetchParameter.stock,
      FetchParameter.image_id,
      FetchParameter.stock_id,
      FetchParameter.colour,
    ]);
    console.log(
      pool.format(whereClause, [
        FetchParameter.type,
        FetchParameter.product_id,
        FetchParameter.season,
        FetchParameter.variant_id,
        FetchParameter.variant_name,
        FetchParameter.design_id,
        FetchParameter.design_name,
        FetchParameter.date_added,
        FetchParameter.gender,
        FetchParameter.price,
        FetchParameter.price,
        FetchParameter.min_age,
        FetchParameter.max_age,
        FetchParameter.size,
        FetchParameter.size_group,
        FetchParameter.stock,
        FetchParameter.image_id,
        FetchParameter.stock_id,
        FetchParameter.colour,
      ]),
    );
    return rows;
  } catch (e) {
    console.error(e);
    throw new Error("Error Fetching Data From Database");
  }
}

async function subQuery(database, pool, image_id) {
  let query = `
                      SELECT 
                          p.type,
                          p.season,
                          d.gender,
                          d.date_added,
                          s.price,
                          s.min_age,
                          s.max_age,
                          s.image_id,
                          s.colour,
                          s.size,
                          s.size_group,
                          d.design_name,
                          v.variant_name,
                          p.product_id,
                          s.stock
                          
                      FROM design d
                      JOIN variant v ON d.variant_id = v.variant_id
                      JOIN product p ON v.product_id = p.product_id
                      JOIN stock s on s.design_id = d.design_id
                      WHERE 
                          d.variant_id = (
                              SELECT variant_id
                              FROM design
                              WHERE design_id = (
                                SELECT design_id
                                FROM stock
                                WHERE image_id = COALESCE(?, image_id)
                              )
                          );
                    `;
  try {
    await pool.query(`USE ${database};`);
    const [rows, fields] = await pool.query(query, [image_id]);
    return rows;
  } catch (error) {
    throw new Error(`Error Subquery.${error}`);
  }
}

// async function fetchDataTest(database, FetchParameter, pool) {
//   const whereClause = `
//                       SELECT
//                           p.type, p.price, p.min_age, p.max_age, p.collection,
//                           pv.model_image_id, pv.colour, pv.design, pv.quantity
//                       FROM
//                           products p
//                       JOIN
//                           product_variations pv ON p.product_id = pv.product_id
//                       WHERE
//                           LOWER(REPLACE(REPLACE(p.type,'-',''),' ','')) LIKE COALESCE(?,LOWER(REPLACE(REPLACE(p.type,'-',''),' ','')))
//                           AND p.price <= COALESCE(?, p.price)
//                           AND p.price >= COALESCE(?, p.price)
//                           AND p.min_age >= COALESCE(?, p.min_age)
//                           AND p.max_age <= COALESCE(?, p.max_age)
//                           AND p.collection = COALESCE(?, p.collection)
//                           AND p.priority = COALESCE(?, p.priority)
//                           AND pv.model_image_id = COALESCE(?, pv.model_image_id)
//                           AND pv.colour = COALESCE(?, pv.colour);
//                         `;
//
//   try {
//     await pool.query(`USE ${database};`);
//     const [rows, fields] = await pool.query(whereClause, [
//       FetchParameter.type,
//       FetchParameter.max_price,
//       FetchParameter.min_price,
//       FetchParameter.min_age,
//       FetchParameter.max_age,
//       FetchParameter.collection,
//       FetchParameter.priority,
//       FetchParameter.image_Id,
//       FetchParameter.colour,
//     ]);
//     return rows;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error Fetching Data From Database");
//   }
// }

// async function subQuery(database, pool, model_image_id) {
//   let query = `
//                       SELECT
//                           p.type,
//                           p.price,
//                           p.min_age,
//                           p.max_age,
//                           p.collection,
//                           pv.model_image_id,
//                           pv.colour,
//                           pv.design,
//                           pv.quantity,
//                           pv.size
//                       FROM
//                           products p
//                       JOIN
//                           product_variations pv ON p.product_id = pv.product_id
//                       WHERE
//                           pv.product_id = (
//                               SELECT product_id
//                               FROM product_variations
//                               WHERE model_image_id = COALESCE(?, model_image_id)
//                           );
//                     `;
//   try {
//     await pool.query(`USE ${database};`);
//     const [rows, fields] = await pool.query(query, [model_image_id]);
//     return rows;
//   } catch (error) {
//     throw new Error(`Error Subquery.${error}`);
//   }
// }
//
function endpoints(express, pool, upload, database) {
  const endpoint = express.Router();

  endpoint.get("/", async (req, res) => {
    const indexHTML = "../dist/index.html";
    res.sendFile(indexHTML);
  });

  endpoint.get("/api/home", async (req, res) => {
    const parameter = new FetchParameter({
      date_added: 100,
    });
    const imageList = await fetchDataTest(database, parameter, pool);
    console.log(imageList);
    res.status(200).json(imageList);
  });

  endpoint.get("/api/search", async (req, res) => {
    const data = req.query.term
      ? `%${req.query.term.toLowerCase().replace(/[- ]/g, "")}%`
      : null;
    const parameter = new FetchParameter({ type: data });
    const imageList = await fetchDataTest(database, parameter, pool);
    // const response_data = {
    //   query: data,
    // };
    res.status(200).json(imageList);
  });

  endpoint.get("/api/filter", async (req, res) => {
    const data = req.query || null;
    // const parameter = new FetchParameter({ priority: 0 });
    // const parameter = new fetchParameter({
    //   min_price: data.min,
    //   max_price: data.max,
    //   colour: data.colour,
    //   max_age: data.maxAge,
    //   min_age: data.minAge,
    // });

    res.status(200).json(
      await fetchDataTest(
        database,
        {
          data_added: 30,
        },
        pool,
      ),
    );
    const imageList = await fetchDataTest(database, parameter, pool);
    res.status(200).json(imageList);
  });
  endpoint.get("/api/shop", async (req, res) => {
    console.log(req.query);
    // if (req.query.filter == true) {
    //   parameter = new FetchParameter({
    //     min_price: req.query.min_price,
    //     max_price: req.query.max_price,
    //     min_age: req.query.min_age,
    //     max_age: req.query.max_age,
    //     gender: req.query.gender,
    //     colour: req.query.colour,
    //     size_group: req.query.size_group,
    //     date_added: 30,
    //   });
    // } else if (req.query.filter == true) {
    //   parameter = new FetchParameter({
    //     date_added: 30,
    //   });
    // }
    // const parameter = new FetchParameter({
    //   min_price: req.query.filter ? req.query.min_price : null,
    //   max_price: req.query.filter ? req.query.max_price : null,
    //   min_age: req.query.filter ? req.query.min_age : null,
    //   max_age: req.query.filter ? req.query.max_age : null,
    //   gender: req.query.filter ? req.query.gender : null,
    //   colour: req.query.filter ? req.query.colour : null,
    //   size_group: req.query.filter ? req.query.size_group : null,
    //   date_added: 30,
    // });
    // const parameter =
    //   req.query.filter === "true"
    //     ? new FetchParameter({
    //         min_price: req.query.min_price,
    //         max_price: req.query.max_price,
    //         min_age: req.query.min_age,
    //         max_age: req.query.max_age,
    //         gender: req.query.gender,
    //         colour: req.query.colour,
    //         size_group: req.query.size_group,
    //       })
    //     : new FetchParameter({ date_added: 30 });
    const parameter = new FetchParameter({
      type: req.query.type,
      product_id: req.query.product_id,
      season: req.query.season,
      variant_id: req.query.variant_id,
      variant_name: req.query.variant_name,
      design_id: req.query.design_id,
      design_name: req.query.design_name,
      date_added: 100,
      gender: req.query.gender,
      min_price: req.query.minPrice,
      max_price: req.query.maxPrice,
      min_age: req.query.minAge,
      max_age: req.query.maxAge,
      size_group: req.query.size,
      // size_group: req.query.size_group,
      stock: req.query.stock,
      image_id: req.query.image_id,
      stock_id: req.query.stock_id,
      colour: req.query.colour,
    });
    console.log(parameter);
    const imageList = await fetchDataTest(database, parameter, pool);
    console.log(imageList);
    res.status(200).json(imageList);
  });
  endpoint.get("/api/product", async (req, res) => {
    const model_id = req.query.model;
    let imageList = await subQuery(database, pool, model_id);
    res.status(200).json(imageList);
  });
  endpoint.get("*", async (_, res) => {
    const indexHTML = "/home/neon/PROJECTS/reactor/dist/index.html";
    res.sendFile(indexHTML);
  });

  return endpoint;
}

(async function main() {
  let pool;
  const database = "nodeV2";

  try {
    pool = mysql.createPool({
      host: "localhost",
      user: "node",
      password: "node_js",
      waitForConnections: true,
      connectionLimit: 10,
      multipleStatements: true,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Database Pool Creation Failed.");
  }

  initializeDatabase(database, pool);
  const upload = filehandler(multer, fs, path);

  const app = express();

  app.use("/img", express.static(path.join(__dirname, "../dist/public/img/")));
  // app.use(
  //   "/images",
  //   express.static("/home/neon/PROJECTS/reactor/dist/images/"),
  //);
  app.use(express.static(path.join(__dirname, "../dist/")));
  // app.use(express.static(path.join(__dirname, "src")));
  app.use(express.json());

  const endpoint = endpoints(express, pool, upload, database);
  app.use("/", endpoint);

  const port = 8080;
  app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
  });
})();
