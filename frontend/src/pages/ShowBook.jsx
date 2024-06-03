import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="absolute top-15 left-0 p-4">
        <BackButton />
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="max-w-2xl w-full p-8 bg-white shadow-2xl rounded">
          <h1 className="text-3xl font-semibold mb-4">Book details</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col">
              <InfoRow label="Id" value={book._id} />
              <InfoRow label="Title" value={book.title} />
              <InfoRow label="Author" value={book.author} />
              <InfoRow label="Publish Year" value={book.publishYear} />
              <InfoRow
                label="Create Time"
                value={new Date(book.createdAt).toDateString()}
              />
              <InfoRow
                label="Last Updated"
                value={new Date(book.updatedAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  hour12: true,
                  timeZone: "America/Halifax",
                })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between my-2">
    <span className="text-lg text-gray-600">{label}</span>
    <span className="text-lg">{value}</span>
  </div>
);

export default ShowBook;
