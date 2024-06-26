import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import DeleteDialog from "../components/DeleteDialog";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const [open, setOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteBook = () => {
    if (!bookToDelete) return;

    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${bookToDelete._id}`)
      .then(() => {
        setLoading(false);
        setBooks(books.filter((book) => book._id !== bookToDelete._id));
        setOpen(false);
        navigate("/books");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const openDeleteDialog = (book) => {
    setBookToDelete(book);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={showType === "table"}
            onChange={() =>
              setShowType(showType === "table" ? "card" : "table")
            }
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {showType === "table" ? "Table" : "Card"}
          </span>
        </label>
      </div>

      <div className="flex items-center justify-center">
        <h1 className="text-3xl my-8">Books List</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} onDelete={openDeleteDialog} />
      ) : (
        <BooksCard books={books} onDelete={openDeleteDialog} />
      )}
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        onConfirm={handleDeleteBook}
      />
    </div>
  );
};

export default Home;
