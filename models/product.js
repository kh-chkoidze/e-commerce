import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  id: {
    type: Schema.Types.Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
