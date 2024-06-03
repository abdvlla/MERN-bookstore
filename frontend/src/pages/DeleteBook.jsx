import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteDialog from "../components/DeleteDialog";

const DeleteBook = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/books");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <DeleteDialog open={open} setOpen={setOpen} onConfirm={handleDeleteBook} />
  );
};

export default DeleteBook;
