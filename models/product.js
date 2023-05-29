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
  purchaseQuantity: {
    type: Schema.Types.Number,
  },
  purchasePrice: {
    type: Schema.Types.Number,
  },
  orderQuantity: {
    type: Schema.Types.Number,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
