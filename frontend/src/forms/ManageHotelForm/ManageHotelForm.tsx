import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useAppContext } from "../../contexts/AppContext";
export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  managerContact: string; 
  managerEmail: string; 
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => Promise<HotelType>;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>({
    defaultValues: hotel || {
      name: "",
      city: "",
      country: "",
      description: "",
      type: "",
      pricePerNight: 0,
      starRating: 0,
      facilities: [],
      imageFiles: {} as FileList,
      imageUrls: [],
      adultCount: 0,
      childCount: 0,
      managerContact: "",
      managerEmail: "",
    },
  });
  
  const { handleSubmit, reset } = formMethods;
  const formRef = useRef<HTMLFormElement>(null); 
  const [subscribers, setSubscribers] = useState<string[]>([]); 
  const { showToast } = useAppContext();

  useEffect(() => {
    
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("http://localhost:7000/subscribe");
        if (!response.ok) {
          throw new Error("Failed to fetch subscribers");
        }
        const data = await response.json();
        setSubscribers(data.map((subscriber: { email: string }) => subscriber.email));
      } catch (error) {
        
        
        showToast({ message: 'Could not fetch subscribers!', type: "ERROR" });
      }
    };

    fetchSubscribers();
    reset(hotel); 
  }, [hotel, reset]);

  const onSubmit = handleSubmit(async (formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("managerContact", formDataJson.managerContact);
    formData.append("managerEmail", formDataJson.managerEmail);
  
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
  
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }
  
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });
  
    
    const savedHotel = await onSave(formData);
  
    const hotelId = savedHotel._id;
  
    const emailJsData = {
      hotel_id: hotelId, 
      hotel_name: formDataJson.name,
    };
  
   
    if (formRef.current) {
      try {
        
        const emailPromises = subscribers.map((subscriberEmail) => {
          return emailjs.send(
            "service_2lrdx0o",  
            "template_ortjnrs", 
            {
              user_email: subscriberEmail,  
              ...emailJsData,  
            },
            "QOfvyOZnyYouJHNyn" 
          );
        });
  
        await Promise.all(emailPromises);
        
      } catch (error) {
        // console.error("EmailJS Error:", error);
        // toast.error("Failed to send emails.");
        // setEmailError("Failed to send emails.");
      }
    }
  });
  

  return (
    <FormProvider {...formMethods}>
      <form ref={formRef} className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex justify-center sm:justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-yellow-400 text-black p-4 pr-8 pl-8 border-2 border-black rounded-lg shadow-xl hover:bg-yellow-300 disabled:bg-gray-500 
                    text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
      </form>
    
    
    </FormProvider>
  );
};

export default ManageHotelForm;
