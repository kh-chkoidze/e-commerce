import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

async function popular() {
  try {
    let getProduct = await Product.find();

    let maxOrderQuantityLength = 0;
    let maxOrderQuantityObject = null;

    for (let i = 0; i < getProduct.length; i++) {
      const currentObject = getProduct[i];
      const currentOrderQuantityLength = currentObject.orderQuantity.length;

      if (currentOrderQuantityLength > maxOrderQuantityLength) {
        maxOrderQuantityLength = currentOrderQuantityLength;
        maxOrderQuantityObject = currentObject;
      }

      if (currentOrderQuantityLength === maxOrderQuantityLength) {
        console.log("Warning: 2 or more equal popular producr.");
        return;
      }
    }
    if (maxOrderQuantityObject === null) {
      console.warn("Warning: No popular product found.");
      return;
    }
    console.log("The most popular product: ", maxOrderQuantityObject.name);
    //console.log(maxOrderQuantityObject.id);
  } catch (error) {
    console.error("Failed to save product:", error);
  } finally {
    mongoose.connection.close();
  }
}

popular();
