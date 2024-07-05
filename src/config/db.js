// config/db.config.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const dataBaseUri = process.env.mongoURI;
const connectDB = async () => {
    try {
        await mongoose.connect(dataBaseUri,{
        });
        console.log("🟢 Database connection established 🟢");
      } catch (error) {
        console.error(`🔴 Database connection failed 🔴, ${error.message}`);
        process.exit(1);
      }
};

export default connectDB;
