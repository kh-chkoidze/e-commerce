#! /usr/bin/env node

import connectToMongo from "./config/mongo.js";

import dotenv from "dotenv";
import Product from "./models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

prompt.start();
/*prompt.get(["name", "price", "id"], function (err, result) {
  console.log("Command-line input received:");
  console.log("productname: " + result.name);
  console.log("price: " + result.price);
  console.log("id: " + result.id);

  const { productId, productName, productPrice } = result;
  console.log('Product ID:', productId);
  console.log('Product Name:', productName);
  console.log('Product Price:', productPrice);
});*/

prompt.get(
  ["productName", "productPrice", "productId"],
  function (err, result) {
    console.log("Product Name:", result.productName);
    console.log("Product Price:", result.productPrice);
    console.log("Product ID:", result.productId);

    // Create a new product document
    const newProduct = new Product({
      name: result.productName,
      price: result.productPrice,
      id: result.productId,
    });

    // Save the new product to the database
    newProduct.save(function (err) {
      if (err) {
        console.error("Failed to save product:", err);
      } else {
        console.log("Product saved successfully");
      }

      // Close the database connection
      mongoose.connection.close();
    });
  }
);

/*async function saveProduct() {
  const name = prompt("product name?");
  const price = prompt("product price");
  const id = prompt("product id");

  await Product.create({ name, price, id });
  console.log(id, name, price);
}

saveProduct();*/
