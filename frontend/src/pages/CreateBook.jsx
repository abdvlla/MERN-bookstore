import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BookForm from "../components/BookForm";

const CreateBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/books",
        formData
      );

      if (response.status === 201) {
        enqueueSnackbar("Book Created successfully", { variant: "success" });

        navigate(`/books/details/${response.data._id}`);
      } else {
        enqueueSnackbar("Error", { variant: "error" });
      }
    } catch (error) {
      console.log("Error creating book:", error);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 flex justify-center">Create Book</h1>
      <div className="max-w-xl mx-auto">
        <BookForm
          initialValues={{ title: "", author: "", publishYear: "" }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateBooks;
