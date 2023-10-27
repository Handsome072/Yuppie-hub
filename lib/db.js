import mongoose from "mongoose";

const url = process.env.MONGO_URL;
let isConnected = false;

const connectToMongo = async () => {
  mongoose.set("strictQuery", true);

  if (!url) {
    return console.log("MONGO_URL not found");
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    db.once("open", () => {
      isConnected = true;
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

export default connectToMongo;
