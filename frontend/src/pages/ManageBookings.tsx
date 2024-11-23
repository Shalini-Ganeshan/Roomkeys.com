import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import * as apiClient from "../api-client";

const ManageBookings = () => {
  const { id } = useParams(); 
  if (!id) {
    return <span>No hotel ID found. Please check the URL.</span>;
  }
  const { data: hotelData, isLoading } = useQuery(["fetchHotel", id], () =>
    apiClient.fetchHotelById(id) 
  );


  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;  

  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!hotelData) {
    return <span>No Hotel found</span>;
  }
  const filteredBookings = hotelData.bookings.filter(booking => {
    const matchesName = booking.firstName.toLowerCase().includes(searchName.toLowerCase()) || 
                        booking.lastName.toLowerCase().includes(searchName.toLowerCase());

    const matchesDateRange = (!startDate || new Date(booking.checkIn) >= new Date(startDate)) && 
                             (!endDate || new Date(booking.checkOut) <= new Date(endDate));

    return matchesName && matchesDateRange;
  });

  const totalBookings = filteredBookings.length;
  const totalPages = Math.ceil(totalBookings / bookingsPerPage);

  const startIndex = (currentPage - 1) * bookingsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, startIndex + bookingsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-5 text-center ">
    <h1 className="lg:text-2xl  font-semibold">Manage Bookings for {hotelData.name}</h1>

    <div className="flex flex-col gap-4 lg:flex-row lg:space-x-4 justify-center">
      <input
        type="text"
        placeholder="Search by guest name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="border p-2 rounded w-full lg:w-auto"
      />
    <input
        type="date"
        value={startDate}
        placeholder="Check-in"
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded w-full lg:w-auto"
      />
      <input
        type="date"
        value={endDate}
        placeholder="Check-out"
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded w-full lg:w-auto"
      />
      <button
        onClick={() => { setSearchName(""); setStartDate(""); setEndDate(""); setCurrentPage(1); }}
        className="p-2 bg-amber-400 rounded border-2 border-black"
      >
        Reset Filters
      </button>
    </div>

    
    <div className="space-y-4 grid lg:grid-cols-2 lg:gap-6 lg:p-4">
        {totalBookings > 0 ? (
          currentBookings.map((booking, index) => (
            <div
              key={index}
              className="border p-4 rounded-md gap-4 border-yellow-400"
            >
              <div className="lg:w-1/2 sm:w-3/4 mx-auto">
              <div className="flex justify-between ">
                <strong>Name:</strong> <span>{booking.firstName} {booking.lastName}</span>
              </div>
              <div className="flex justify-between  ">
                <strong>Email:</strong> <span>{booking.email}</span>
              </div>
              <div className="flex justify-between ">
                <strong>Adults:</strong> <span>{booking.adultCount}</span>
              </div>
              <div className="flex justify-between  ">
                <strong>Children:</strong> <span>{booking.childCount}</span>
              </div>
              <div className="flex justify-between ">
                <strong>Check-In:</strong> <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between  ">
                <strong>Check-Out:</strong> <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between ">
                <strong>Total Cost:</strong> <span>£{booking.totalCost}</span>
              </div>
              <div className="flex justify-between ">
                <strong>Status:</strong> 
                <span className={booking.status === 'Cancelled' ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
                  {booking.status}
                </span>
              </div>
            </div>
            </div>
          ))
        ) : (
          <p >No bookings available.</p>
        )}
      </div>

    <div className="flex justify-between items-center pt-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`p-2 bg-indigo-800 w-32  text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`p-2 bg-indigo-800 rounded w-32 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </button>
    </div>
  </div>
);
};
export default ManageBookings;
