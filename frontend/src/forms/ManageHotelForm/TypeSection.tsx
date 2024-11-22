import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="px-4 sm:px-0">
      <h2 className="text-xl md:text-2xl font-semibold mb-3">Type</h2> 
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2"> 
        {hotelTypes.map((type) => (
          <label
            key={type} 
            className={`cursor-pointer text-sm rounded-full px-4 py-2 border-2 border-black ${
              typeWatch === type
                ? "bg-yellow-400"
                : "bg-indigo-800 text-white"
            }`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm ">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
