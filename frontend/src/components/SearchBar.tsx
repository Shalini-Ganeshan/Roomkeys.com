import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore, MdMic, MdMicOff } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import useSpeechRecognition from "./useSpeechRecognition";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext(); 

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search");
  };

  const handleClear = () => {
    setDestination('');
    setAdultCount(0);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const { isListening, startListening, stopListening } = useSpeechRecognition((result) => {
    setDestination(result);
  });

  const handleAdultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 35)) {
      setAdultCount(Number(value) || 0);  // Only set a valid number or 0 if empty
    }
  };

  const handleChildChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 35)) {
      setChildCount(Number(value) || 0);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-yellow-400 md:-mt-8  rounded shadow-md flex flex-col gap-4"
    >
      {/* Main Input Row */}
      <div className="flex flex-wrap gap-4 items-center">
        
        {/* Destination Input */}
        <div className="flex-2">
          <div className="flex items-center border-2 border-indigo-800 shadow-xl rounded-xl bg-white p-1 w-full">
            <MdTravelExplore size={20} className="mr-1" />
            <input
              placeholder="Where are you going?"
              className="text-sm md:text-base w-full focus:outline-none p-1"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
            <button
              type="button"
              onClick={() => (isListening ? stopListening() : startListening())}
              className="ml-1"
            >
              {isListening ? <MdMicOff size={20} /> : <MdMic size={20} />}
            </button>
          </div>
        </div>
        {/* Adults Input */}
        <div className="flex-1">
          Adult:
          <input
            type="text"
            value={adultCount}
            onChange={handleAdultChange}
            placeholder="Adults"
            className="w-full bg-white border-2 border-indigo-800 shadow-xl rounded-xl text-sm p-2"
          />
        </div>

        {/* Children Input */}
        <div className="flex-1">
          Children: 
          <input
            type="text"
            value={childCount}
            onChange={handleChildChange}
            placeholder="Children"
            className="w-full bg-white border-2 border-indigo-800 shadow-xl rounded-xl text-sm p-2"
          />
        </div>
      </div>
             <div className="flex-1">
          <div className="border-2 border-indigo-800 shadow-xl rounded-xl bg-white w-full">
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in"
              className="w-full bg-white p-2 text-sm text-center focus:outline-none rounded-xl"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex-1">
          <div className="border-2 border-indigo-800 shadow-xl rounded-xl bg-white w-full">
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out"
              className="w-full bg-white p-2 text-sm text-center focus:outline-none rounded-xl"
            />
          </div>
        </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <button className="w-full sm:w-auto lg:w-1/5 bg-indigo-800 border-2 shadow-xl border-indigo-900 text-white py-2 rounded-xl text-md hover:bg-indigo-700">
          Search
        </button>
        <button
          onClick={handleClear}
          className="w-full sm:w-1/2 lg:w-1/5 bg-indigo-800 border-2 shadow-xl border-indigo-900 text-white py-2 rounded-xl text-md hover:bg-indigo-700"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
