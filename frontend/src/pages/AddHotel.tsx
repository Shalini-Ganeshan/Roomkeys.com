import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { HotelType } from "../../../backend/src/shared/types";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutateAsync, isLoading } = useMutation<HotelType, Error, FormData>(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel!", type: "ERROR" });
    },
  });

  const handleSave = async (hotelFormData: FormData): Promise<HotelType> => {
    return await mutateAsync(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
