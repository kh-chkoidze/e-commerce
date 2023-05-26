#! /usr/bin/env node

import connectToMongo from "./config/mongo.js";
import dotenv from "dotenv";

dotenv.config();
connectToMongo();

console.log("Hello World!");
