import mongoose from "mongoose";

const connect = () => {
  try {
    const connectionUrl =
      "mongodb+srv://iliachkoidze12:zaza@cluster12.f4ptbec.mongodb.net/e-commerce";
    return mongoose.connect(connectionUrl);
  } catch (error) {
    return error;
  }
};
