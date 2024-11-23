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
  const [checkIn, setCheckIn] = useState<Date >(search.checkIn);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-yellow-400 md:-mt-8 rounded shadow-md flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <div className="flex items-center border-2 border-indigo-800 shadow-xl rounded-xl bg-white p-1 flex-1 lg:flex-[1.5]">
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
        
       

        <div className="flex flex-col lg:flex-row lg:gap-4 flex-1 gap-2">
          <div className="border-2 border-indigo-800 shadow-xl rounded-xl bg-white flex-[1.5]">
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in"
              className="w-full bg-white p-2 ml-10 md:ml-0 text-sm text-center focus:outline-none rounded-xl"
            />
          </div>

          <div className="border-2 border-indigo-800 shadow-xl rounded-xl bg-white flex-[1.5]">
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out"
              className="w-full bg-white p-2 ml-10 md:ml-0 text-sm text-center focus:outline-none rounded-xl"
            />
          </div>
        </div>
      </div>

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
