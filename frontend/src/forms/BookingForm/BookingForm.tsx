import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "react-query";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import * as apiClient from "../../api-client";
import emailjs from '@emailjs/browser'; 
import { useAppContext } from "../../contexts/AppContext";
import { HotelType, PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types";
import { StripeCardElement } from "@stripe/stripe-js";
type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  status:'Confirmed'|'Cancelled';
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  

  interface ManagerData {
    managerEmail: string | PromiseLike<string | null> | null;
     
}
const fetchHotelDetails = async (hotelId: string): Promise<HotelType | null> => {
  try {
      const hotelData = await apiClient.fetchHotelById(hotelId);
    
      return hotelData;
  } catch (error) {
      // console.error("Error fetching hotel details:", error);
      return null; 
  }
};


const fetchManagerEmail = async (hotelId: string): Promise<string | null> => {
    try {
        const managerData: ManagerData = await apiClient.getHotelManager(hotelId);
       
        return managerData.managerEmail;  
    } catch (error) {
        // console.error("Error fetching manager email:", error);
        return null; 
    }
};

  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
    onSuccess: () => {
      showToast({ message: 'Booking Saved!', type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Book!", type: "ERROR" });
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
      hotelId: hotelId, 
    },
  });
  
    const sendConfirmationToGuest = async (formData: BookingFormData) => {
      try {
        const hotelDetails = await fetchHotelDetails(formData.hotelId);
        if (!hotelDetails) {
          // console.error("Hotel details not found for hotel ID:", formData.hotelId);
          return;
        }
  
        const hotelName = hotelDetails.name; 
        const checkInDate = new Date(formData.checkIn).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
  
        const checkOutDate = new Date(formData.checkOut).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
  
        const emailData = {
          guest_name: `${formData.firstName} ${formData.lastName}`,
          guest_email: formData.email,
          hotel_name: hotelName,
          checkin_date: checkInDate,
          checkout_date: checkOutDate,
          adult_count: formData.adultCount,
          children_count: formData.childCount,
              status: "Confirmed", 
        };
  
        await emailjs.send(
          'service_6lyj1im',
          'template_um2on6n',
          emailData,
          '5o5vITdO-Br8nKARm'
        );
        // console.log("Confirmation email!");
      } catch (error) {
        // console.error("Error sending confirmation email to guest:", error);
      }
    };

  const sendConfirmationEmail = async (formData: BookingFormData) => {
    try {
        const managerEmail = await fetchManagerEmail(formData.hotelId);
        if (!managerEmail) {
            // console.error("Manager email not found for hotel:", formData.hotelId);
            return;
        }

        const hotelDetails = await fetchHotelDetails(formData.hotelId);
        if (!hotelDetails) {
            // console.error("Hotel details not found for hotel ID:", formData.hotelId);
            return;
        }

        const hotelName = hotelDetails.name;

        const checkInDate = new Date(formData.checkIn).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

        const checkOutDate = new Date(formData.checkOut).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

        const emailData = {
            manager_email: managerEmail,
            hotel_name: hotelName,
            guest_name: `${formData.firstName} ${formData.lastName}`,
            guest_email: formData.email,
            checkin_date: checkInDate,
            checkout_date: checkOutDate,
            adult_count: formData.adultCount,
            children_count: formData.childCount,
            hotel_id: formData.hotelId,
        };

      
        await emailjs.send(
            'service_6lyj1im',
            'template_ss687je',
            emailData,
            '5o5vITdO-Br8nKARm'
        );
        // console.log("Confirmation email sent to hotel manager!");
    } catch (error) {
        // console.error("Error sending confirmation email:", error);
    }
};




  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
    
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id,   status: "Confirmed",   hotelId: formData.hotelId });

     
      await sendConfirmationEmail(formData);
      await sendConfirmationToGuest(formData);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
  <span className="text-xl sm:text-2xl text-center font-semibold">Confirm Your Details</span>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <label className="text-gray-700 text-sm font-bold flex-1">
      First Name
      <input
        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
        type="text"
        readOnly
        disabled
        {...register("firstName")}
      />
    </label>
    <label className="text-gray-700 text-sm font-bold flex-1">
      Last Name
      <input
        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
        type="text"
        readOnly
        disabled
        {...register("lastName")}
      />
    </label>
    <label className="text-gray-700 text-sm font-bold flex-1">
      Email
      <input
        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
        type="text"
        readOnly
        disabled
        {...register("email")}
      />
    </label>
  </div>

  <div className="space-y-2">
    <h2 className="text-lg sm:text-xl font-semibold">Your Price Summary</h2>
    <div className="bg-blue-200 p-4 rounded-md">
      <div className="font-semibold text-lg">
        Total Cost: £{paymentIntent.totalCost.toFixed(2)}
      </div>
      <div className="text-xs">Includes taxes and charges</div>
    </div>
  </div>

  <div className="space-y-2">
    <h3 className="text-lg sm:text-xl font-semibold">Payment Details</h3>
    <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
  </div>

  <div className="flex lg:justify-end justify-center">
    <button
      disabled={isLoading}
      type="submit"
      className="bg-blue-600 rounded text-black p-2 font-semibold hover:bg-blue-500 text-md"
    >
      {isLoading ? "Saving..." : "Confirm Booking"}
    </button>
  </div>

</form>
  );
};

export default BookingForm;
