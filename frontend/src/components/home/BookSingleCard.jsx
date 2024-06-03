import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import HorizontalDropdown from "../HorizontalDropdown";

const BookSingleCard = ({ book, onDelete }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="relative p-4 m-4 border-2 border-gray-300 rounded-lg shadow-lg hover:shadow-xl">
      <h2 className="absolute bottom-2 right-2 px-3 py-1 bg-gray-500 text-white rounded-lg">
        {book.publishYear}
      </h2>
      <h4 className="my-2 text-gray-500">{book._id}</h4>
      <div className="flex items-center gap-x-2">
        <PiBookOpenTextLight className="text-gray-500 text-2xl" />
        <h2 className="text-lg font-semibold">{book.title}</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <BiUserCircle className="text-gray-500 text-2xl" />
        <h2 className="text-lg">{book.author}</h2>
      </div>
      <div className="absolute top-2 right-2">
        <HorizontalDropdown book={book} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default BookSingleCard;
