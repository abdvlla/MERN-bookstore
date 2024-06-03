import React from "react";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookSingleCard key={book._id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BooksCard;
