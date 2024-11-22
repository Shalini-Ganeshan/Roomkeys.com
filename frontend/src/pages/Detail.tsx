import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import Share from '../components/Share';
import Reviews from "../components/Reviews";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8"> 
      <div>
        <Share 
          description={"Check out RoomKeys - The Best Hotel Booking App! I just came across this wonderful hotel"} 
          hotelName={hotel.name} 
          hotelId={hotelId} 
        />
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="lg:text-2xl  font-semibold"> 
          {hotel.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
        {hotel.imageUrls.map((image, index) => (
          <div key={index} className="h-[200px] sm:h-[300px]"> 
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility, index) => (
          <div key={index} className="border-2 border-yellow-400 text-center rounded-sm p-2 sm:p-3"> 
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div className="whitespace-pre-line text-sm sm:text-base">
          {hotel.description}
        </div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>

      <div className="border-t mt-4 pt-4">
        <h2 className="text-md sm:text-lg font-semibold">
          Hotel Contact Info
        </h2>
        <p className="text-sm sm:text-base">
          Phone Number: <span>{hotel.managerContact}</span>
        </p>
        <p className="text-sm sm:text-base"> 
          Email: <a href={`mailto:${hotel.managerEmail}`} className="text-blue-500 underline">{hotel.managerEmail}</a>
        </p>
      </div>
      <Reviews hotelId={hotelId} />
    </div>
  );
};

export default Detail;
