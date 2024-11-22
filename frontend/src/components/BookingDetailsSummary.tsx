import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  const createGoogleCalendarEvent = () => {
    const title = `Check-in at ${hotel.name}`;
    const startTime = checkIn.toISOString().replace(/-|:|\.\d+/g, "");
    const endTime = checkOut.toISOString().replace(/-|:|\.\d+/g, ""); 
    const description = `You have a booking at ${hotel.name}.\nLocation: ${hotel.city}, ${hotel.country}\nCheck-in: ${checkIn.toDateString()}\nCheck-out: ${checkOut.toDateString()}\nGuests: ${adultCount} adults & ${childCount} children`;

   
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(description)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="grid gap-4 rounded-lg border border-yellow-400 p-5 h-fit">
    <h2 className="text-xl font-semibold sm:text-2xl lg:text-2xl text-center">Your Booking Details</h2>
    <div className="border-b py-2">
      Location:
      <div className="font-semibold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
    </div>
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="mb-2 sm:mb-0">
        Check-in
        <div className="font-semibold">{checkIn.toDateString()}</div>
      </div>
      <div>
        Check-out
        <div className="font-semibold">{checkOut.toDateString()}</div>
      </div>
    </div>
    <div className="border-t border-b py-2">
      Total length of stay:
      <div className="font-semibold">{numberOfNights} nights</div>
    </div>
  
    <div>
      Guests{" "}
      <div className="font-semibold">
        {adultCount} adults & {childCount} children
      </div>
    </div>
  
    <button
      onClick={createGoogleCalendarEvent}
      className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
    >
      Add to Calendar
    </button>
  </div>
  );
};

export default BookingDetailsSummary;
