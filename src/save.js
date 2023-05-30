#! /usr/bin/env node

import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

/*async function saveProduct(productName, productPrice, productId) {
  try {
    const newProduct = new Product({
      id: productId,
      name: productName,
      price: productPrice,
    });

    await newProduct.save();
    console.log("Product saved successfully");
  } catch (error) {
    console.error("Failed to save product:", error);
  } finally {
    mongoose.connection.close();
  }
}*/

async function saveProduct(productName, productPrice, productId) {
  try {
    let existingProduct = await Product.findOne({ id: productId });

    if (existingProduct) {
      existingProduct.name = productName;
      existingProduct.price = productPrice;
      await existingProduct.save();
      console.log("Product updated successfully");
    } else {
      const newProduct = new Product({
        id: productId,
        name: productName,
        price: productPrice,
      });

      await newProduct.save();
      console.log("New product saved successfully");
    }
  } catch (error) {
    console.error("Failed to save product:", error);
  } finally {
    mongoose.connection.close();
  }
}

prompt.start();

prompt.get(
  ["productName", "productPrice", "productId"],
  async function (err, result) {
    if (err) {
      console.error("Prompt error:", err);
      return;
    }

    console.log("Product Name:", result.productName);
    console.log("Product Price:", result.productPrice);
    console.log("Product ID:", result.productId);

    await saveProduct(
      result.productName,
      result.productPrice,
      result.productId
    );
  }
);
