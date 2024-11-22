import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import ClientReviews from '../components/ClientReviews';
import Subscription from "../components/Subscription";
const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return  (
    <div className="space-y-6 p-2 lg:p-4">
   
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
          Latest Destinations
        </h2>
        <p className="text-sm sm:text-md md:text-lg text-gray-500">
          Most recent destinations added by our hosts
        </p>
      </div>

   
      <div className="grid gap-4">
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topRowHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 lg:mt-4">
          {bottomRowHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <ClientReviews />
      </div>

      <div className="mt-6">
        <Subscription />
      </div>
    </div>
  );
};

export default Home;
