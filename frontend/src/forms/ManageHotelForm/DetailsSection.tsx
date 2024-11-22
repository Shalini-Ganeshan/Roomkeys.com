import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return  (
    <div className="flex flex-col gap-4 px-4 sm:px-0"> 
      <h1 className="text-xl sm:text-2xl font-semibold mb-3 m-auto">Add Hotel</h1> 
      
      <label className="text-gray-700 text-sm font-semibold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal shadow-2xl"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 font-normal">{errors.name.message}</span>
        )}
      </label>

      <div className="flex flex-col sm:flex-row gap-4"> 
        <label className="text-gray-700 text-sm font-semibold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal shadow-2xl"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 font-normal">{errors.city.message}</span>
          )}
        </label>
        
        <label className="text-gray-700 text-sm font-semibold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal shadow-2xl"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 font-normal">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-semibold flex-1">
        Description
        <textarea
          rows={4}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500 font-normal">{errors.description.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-semibold">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal shadow-2xl"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 font-normal">{errors.pricePerNight.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-semibold">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full p-2 text-gray-700 font-normal "
        >
          <option value="" className="text-sm font-bold">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((num, index) => (
            <option key={index} value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500 font-normal">{errors.starRating.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-semibold flex-1">
        Manager Contact Number
        <input
          type="tel"
          placeholder="123-456-7890"
          className="border rounded w-full py-1 px-2 font-normal shadow-2xl"
          {...register("managerContact", { required: "This field is required" })}
        />
        {errors.managerContact && (
          <span className="text-red-500 font-normal">{errors.managerContact.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-semibold flex-1">
        Email
        <input
          type="email"
          placeholder="manager@example.com"
          className="border rounded w-full py-1 px-2 font-normal shadow-2xl"
          {...register("managerEmail", { required: "This field is required" })}
        />
        {errors.managerEmail && (
          <span className="text-red-500 font-normal">{errors.managerEmail.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
