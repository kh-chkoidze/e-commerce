import connectToMongo from "../config/mongo.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import prompt from "prompt";

dotenv.config();
connectToMongo();

async function addPropertyToProduct(orderQuantity, productId) {
  try {
    let existingProduct = await Product.findOne({ id: productId });

    if (existingProduct.purchaseQuantity.length === 0) {
      console.log(
        `Error: Product with ID ${existingProduct.id} not found in purchase.`
      );
      return;
    }

    let getPurchaseQuantity = await Product.findOne({ id: productId });
    let getOrderQuantity = await Product.findOne({ id: productId });
    let sumPurchaseQuantity = getPurchaseQuantity.purchaseQuantity.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );

    let sumOrderQuantity =
      getOrderQuantity.orderQuantity.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0
      ) + Number(orderQuantity);

    /*let checkQuantity =
      getPurchaseQuantity.purchaseQuantity.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0
      ) -
      getOrderQuantity.orderQuantity.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        0
      ) +
      Number(orderQuantity);*/

    if (sumPurchaseQuantity < sumOrderQuantity) {
      console.log(
        `Error: Not enough quantity of product with ID ${productId} available.`
      );
      return;
    }

    await Product.updateOne(
      { id: productId },
      {
        $push: { orderQuantity: orderQuantity },
      }
    );

    /*if (result.n === 2) {
      console.log("Product updated successfully");
    } else {
      console.log("Product not found");
    }*/
  } catch (error) {
    console.error("Failed to update product:", error);
  } finally {
    mongoose.connection.close();
  }
}

prompt.start();

prompt.get(["orderQuantity", "productId"], async function (err, result) {
  if (err) {
    console.error("Prompt error:", err);
    return;
  }

  //const { productId, propertyName, propertyValue } = result;
  console.log("Purchase quantity:", result.orderQuantity);
  console.log("Product ID:", +result.productId, typeof +result.productId);

  await addPropertyToProduct(result.orderQuantity, result.productId);
});
