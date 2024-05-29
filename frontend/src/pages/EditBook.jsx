import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BookForm from "../components/BookForm";

const EditBook = () => {
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setBookData({ title, author, publishYear });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while fetching book data", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = (formData) => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
        navigate(`/books/details/${id}`);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while editing the book", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 flex justify-center">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-xl mx-auto">
          <BookForm
            initialValues={{
              title: bookData.title,
              author: bookData.author,
              publishYear: bookData.publishYear,
            }}
            onSubmit={handleEditBook}
          />
        </div>
      )}
    </div>
  );
};

export default EditBook;
