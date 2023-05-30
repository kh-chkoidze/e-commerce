import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

async function addPropertyToProduct(
  purchaseQuantity,
  purchasePrice,
  productId
) {
  try {
    const result = await Product.updateOne(
      { id: productId },
      {
        $push: {
          purchaseQuantity: purchaseQuantity,
          purchasePrice: purchasePrice,
        },
      }
    );

    if (result.n === 2) {
      console.log("Product updated successfully");
    } else {
      console.log("Product not found");
    }
  } catch (error) {
    console.error("Failed to update product:", error);
  } finally {
    mongoose.connection.close();
  }
}

prompt.start();

prompt.get(
  ["purchaseQuantity", "purchasePrice", "productId"],
  async function (err, result) {
    if (err) {
      console.error("Prompt error:", err);
      return;
    }

    //const { productId, propertyName, propertyValue } = result;
    console.log("Purchase quantity:", result.purchaseQuantity);
    console.log("Purchase prise:", result.purchasePrice);
    console.log("Product ID:", +result.productId, typeof +result.productId);

    await addPropertyToProduct(
      result.purchaseQuantity,
      result.purchasePrice,
      result.productId
    );
  }
);
