import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="border border-slate-300 rounded-lg p-4 gap-4 md:gap-8 flex flex-col md:flex-row">
      
      
      <div className="w-full h-[200px] md:w-[300px] md:h-[250px] mb-4 md:mb-0 flex-shrink-0">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-lg"
          alt={hotel.name}
        />
      </div>

    
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-xl md:text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mt-4">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-slate-300 p-1 md:p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm">
                +{hotel.facilities.length - 3}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="font-bold">£{hotel.pricePerNight} per night</span>
            <div className="mb-2">
              <Link
                to={`/detail/${hotel._id}`}
                className="hover:bg-yellow-300 text-black p-2 rounded font-semibold text-sm bg-yellow-400"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
