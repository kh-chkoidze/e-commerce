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
  } catch (error) {
    console.error("Failed to save product:", error);
  } finally {
    mongoose.connection.close();
  }
}

fewest();
