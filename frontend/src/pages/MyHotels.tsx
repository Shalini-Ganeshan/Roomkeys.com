import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const MyHotels = () => {

  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }
  const handleManageBookings = (hotelId: string): void => {
    const navigate = useNavigate();
    navigate(`/${hotelId}/manage`);
  };

  return  (
    <div className="space-y-5">
      <span className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-xl sm:text-xl md:text-3xl font-semibold sm:mb-5  lg:ml-32 ">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-indigo-800 w-1/2 lg:w-1/6 lg:mr-32 md:w-1/4 text-center text-white border-2 border-indigo-900 lg:font-semibold p-2 hover:bg-indigo-900 rounded-lg shadow-2xl"
        >
          Add Hotel
        </Link>
      </span>

      <div className="flex flex-col gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel.name}
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-yellow-300 rounded-lg p-5 md:p-8 gap-5 sm:max-w-8xl mx-auto md:max-w-lg lg:max-w-4xl shadow-lg"
          >
            <h2 className="text-lg sm:text-lg md:text-2xl font-semibold">{hotel.name}</h2>
            <div className="whitespace-pre-line text-sm sm:text-xsm md:text-base">
              {hotel.description}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="border border-indigo-300 rounded-sm p-2 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-indigo-300 rounded-sm p-2 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-indigo-300 rounded-sm p-2 flex items-center">
                <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
              </div>
              <div className="border border-indigo-300 rounded-sm p-2 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-indigo-300 rounded-sm p-2 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
              <button
                className="bg-yellow-400 w-full lg:w-48 lg:mt-4 md:w-24 text-center text-black border-2 border-indigo-900 lg:text-md font-semibold p-2 hover:bg-yellow-300 rounded-lg shadow-2xl"
                onClick={() => handleManageBookings(hotel._id)}
              >
                Manage Bookings ({hotel.bookings.length})
              </button>
            </div>

            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-yellow-400 w-full md:w-1/4 text-center text-black border-2 border-indigo-800 font-semibold p-2 hover:bg-yellow-300 rounded-lg shadow-2xl"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
