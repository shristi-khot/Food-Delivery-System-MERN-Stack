import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://username:password@cluster0.la7aqwz.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}

// add username and password in the connection string before running the code.