import { useQuery, useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import emailjs from '@emailjs/browser'; 

const MyBookings = () => {
  const queryClient = useQueryClient();

  const { data: hotels, isLoading, isError } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  const mutation = useMutation(apiClient.cancelBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchMyBookings");
    },
    onError: (error) => {
      // console.error("Error cancelling booking:", error);
    },
  });

  const sendCancellationEmail = async (booking, hotel) => {
    const emailData = {
      hotel_name: hotel.name,
      guest_name: `${booking.firstName} ${booking.lastName}`,
      guest_email: booking.email,
      checkin_date: new Date(booking.checkIn).toDateString(),
      checkout_date: new Date(booking.checkOut).toDateString(),
      adult_count: booking.adultCount,
      children_count: booking.childCount,
      hotel_id: hotel.id,
    };

    try {
      await emailjs.send(
        'service_w53efrh',           
        'template_jssoga7',   
        emailData,                   
        'WvngVHM6xirSORI50'       
      );
      // console.log("Cancellation email sent successfully!");
    } catch (error) {
      // console.error("Failed to send cancellation email:", error);
    }
  };

  const handleCancelBooking = (booking, hotel) => {
    mutation.mutate(booking._id, {
      onSuccess: () => {
        sendCancellationEmail(booking, hotel); 
      },
    });
  };

  if (isLoading) {
    return <span>Loading...</span>; 
  }

  if (isError) {
    return <span>Error fetching bookings, Please try again later.</span>; 
  }

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-yellow-300 rounded-lg p-5 sm:p-8 gap-4 sm:gap-5"
        >
          <div className="w-full h-[200px] sm:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center rounded"
              alt={hotel.name}
            />
          </div>

          <div className="flex flex-col max-h-[400px] overflow-hidden ">
            <div className="text-xl sm:text-2xl font-bold text-center mb-3">
              {hotel.name}
              <div className="text-sm font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>

            {/* Scrollable bookings section */}
            <div className="flex-grow overflow-y-auto max-h-[300px] text-center">
              {hotel.bookings.map((booking) => (
                <div key={booking._id} className="space-y-2">
                  <div>
                    <span className="font-bold mr-2">Dates:</span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} -{" "}
                      {new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking.adultCount} adults, {booking.childCount} children
                    </span>
                  </div>

                  <button
                    onClick={() => handleCancelBooking(booking, hotel)}
                    className={`mt-2 ${
                      booking.status === "Cancelled"
                        ? "bg-red-300  text-red-600 cursor-not-allowed"
                        : "bg-red-500 text-white "
                    } px-2 py-1 rounded w-full sm:w-auto text-sm `}
                    disabled={booking.status === "Cancelled"}
                  >
                    {booking.status === "Cancelled"
                      ? "Booking Cancelled"
                      : "Cancel Booking"}
                  </button>
               
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
