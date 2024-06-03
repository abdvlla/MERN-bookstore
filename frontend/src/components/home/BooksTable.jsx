import { Link } from "react-router-dom";
import HorizontalDropdown from "../HorizontalDropdown";
import { useState } from "react";

const BooksTable = ({ books, onDelete }) => {
  return (
    <div className="content-center py-4 px-4 mx-auto max-w-screen-lg relative overflow-x-auto sm:rounded-lg ">
      <table className="text-left table-auto border-x border-b w-full border rounded-lg shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              No.
            </th>
            <th scope="col" className="px-4 py-3">
              Title
            </th>
            <th scope="col" className="px-4 py-3 max-md:hidden">
              Author
            </th>
            <th scope="col" className="px-4 py-3 max-md:hidden">
              Year published
            </th>
            <th scope="col" className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td
                scope="row"
                className="px-4 py-3 font-medium whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </td>
              <td className="px-4 py-3 text-gray-900">{book.title}</td>
              <td className="px-4 py-3 text-gray-900 max-md:hidden">
                {book.author}
              </td>
              <td className="px-4 py-3 max-md:hidden">{book.publishYear}</td>
              <td className="px-4 py-3">
                <HorizontalDropdown
                  book={book}
                  onDelete={() => onDelete(book)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
