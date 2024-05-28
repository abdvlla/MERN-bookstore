import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import indexRoute from "./routes/indexRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/books", booksRoute);
app.use("/", indexRoute);

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
