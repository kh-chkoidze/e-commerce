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
    type: Schema.Types.Array,
  },
  purchasePrice: {
    type: Schema.Types.Array,
  },
  orderQuantity: {
    type: Schema.Types.Array,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
