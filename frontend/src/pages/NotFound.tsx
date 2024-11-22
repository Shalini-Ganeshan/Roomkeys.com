import React from 'react';
import { Link } from 'react-router-dom';
import img from '../image/not-found.png'

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800 p-4">
      
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center text-amber-600">
        404
      </h1>
      <img
        src={img} 
        alt="Page Not Found"
        className="w-3/4 md:w-2/3 lg:w-1/4  mb-8 rounded-lg shadow-md"
      />
      <p className="text-lg md:text-lg sm:text-sm font-semibold text-gray-700 mb-6 text-center">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-amber-400 text-black py-3 px-5 rounded-lg shadow-lg hover:bg-amber-500 transition duration-300 sm:text-md md:text-md text-center"
      >
        Go back to Homepage
      </Link>
      <p className="mt-4 text-sm md:text-md text-gray-600">
        If you think this is a mistake, please contact support.
      </p>
    </div>
  );
};

export default NotFound;
