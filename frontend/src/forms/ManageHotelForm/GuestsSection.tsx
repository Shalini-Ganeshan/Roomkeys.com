import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="px-4 sm:px-0"> {/* Add horizontal padding for mobile */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-3">Guests</h2> {/* Adjust title size for mobile */}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 p-6 gap-5 bg-yellow-400 shadow-2xl rounded-lg"> {/* Ensure grid adapts properly */}
        <label className="text-black text-sm">
          Adults
          <input
            className="border-2 border-indigo-800 rounded w-full py-2 px-3 font-semibold"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className="text-black text-sm">
          Children
          <input
            className="border-2 border-indigo-800 rounded w-full py-2 px-3 font-semibold"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
