import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
    to={`/detail/${hotel._id}`}
    className="relative cursor-pointer overflow-hidden rounded-md"
  >
    <div className="h-[200px] sm:h-[300px] md:h-[400px]">
      <img
        src={hotel.imageUrls[0]}
        className="w-full h-full object-cover object-center"
        alt={hotel.name} 
      />
    </div>

    <div className="absolute bottom-0 p-2 sm:p-4 bg-black bg-opacity-50 w-full rounded-b-md">
      <span className="text-white font-normal text-sm sm:text-lg md:text-xl">
        {hotel.name}
      </span>
    </div>
  </Link>
  );
};

export default LatestDestinationCard;
