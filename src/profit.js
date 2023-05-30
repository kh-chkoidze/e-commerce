import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

async function saveProduct(productId) {
  try {
    let getProduct = await Product.findOne({ id: productId });

    if (
      getProduct.purchaseQuantity.length === 0 &&
      getProduct.orderQuantity.length === 0
    ) {
      console.log(
        `No  purchases and orders found with product ID: ${productId}`
      );
      return;
    } else if (getProduct.purchaseQuantity.length === 0) {
      console.log(`No  purchases  found with product ID: ${productId}`);
      return;
    } else {
      console.log(`No orders  found with product ID: ${productId}`);
      return;
    }

    let purchaseSum = 0;
    let orderSum = 0;

    for (let i = 0; i < getProduct.purchasePrice.length; i++) {
      purchaseSum =
        purchaseSum +
        Number(getProduct.purchasePrice[i]) *
          Number(getProduct.purchaseQuantity[i]);
    }

    for (let x = 0; x < getProduct.orderQuantity.length; x++) {
      orderSum =
        orderSum + Number(getProduct.orderQuantity[x]) * getProduct.price;
    }

    console.log("Purchase income: ", purchaseSum);
    console.log("Order income: ", orderSum);
    console.log("profit: ", purchaseSum - orderSum);
  } catch (error) {
    console.error("Failed to save product:", error);
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

  console.log("Product ID:", result.productId);

  await saveProduct(result.productId);
});
