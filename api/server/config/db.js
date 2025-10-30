import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/login`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // stop app if db fails
  }
};

export default connectDB;
