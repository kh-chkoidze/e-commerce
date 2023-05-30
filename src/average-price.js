import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

async function addPropertyToProduct(productId) {
  try {
    const result = await Product.findOne({ id: productId });
    const averagePrice =
      result.purchasePrice.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0
      ) / result.purchasePrice.length;
    console.log(averagePrice);
  } catch (error) {
    console.error("Failed to update product:", error);
  } finally {
    mongoose.connection.close();
  }
}

prompt.start();

prompt.get(["productId"], async function (err, result) {
  if (err) {
    console.error("Prompt error:", err);
    return;
  }

  //const { productId, propertyName, propertyValue } = result;

  console.log("Product ID:", +result.productId, typeof +result.productId);

  await addPropertyToProduct(result.productId);
});
