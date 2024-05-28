import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("INDEX");
  let books;
  try {
    books = await Book.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }
});

export default router;
