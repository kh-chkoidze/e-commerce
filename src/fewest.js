import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

async function fewest() {
  try {
    let getProduct = await Product.find();
    console.log(getProduct);

    let minOrderQuantitySum = Infinity;
    let minOrderQuantityObject = null;

    for (let i = 0; i < getProduct.length; i++) {
      const currentObject = getProduct[i];
      const currentOrderQuantity = currentObject.orderQuantity;
      const orderQuantitySum = currentOrderQuantity.reduce(
        (acc, val) => acc + parseInt(val),
        0
      );

      if (currentOrderQuantity.length === 0) {
        console.log(`No orders for product : ${currentObject.name}`);
      } else if (orderQuantitySum === 0) {
        console.log(`No order quantity for product : ${currentObject.id}`);
      } else if (orderQuantitySum < minOrderQuantitySum) {
        minOrderQuantitySum = orderQuantitySum;
        minOrderQuantityObject = currentObject;
      }
    }

    if (minOrderQuantityObject) {
      console.log(
        "Product with the fewest sum of orderQuantity elements: ",
        minOrderQuantityObject.name
      );
      //console.log(minOrderQuantityObject);
    } else {
      console.log("No product with non-zero orderQuantity sum found.");
    }
  } catch (error) {
    console.error("Failed to retrieve products:", error);
  } finally {
    mongoose.connection.close();
  }
}

fewest();
