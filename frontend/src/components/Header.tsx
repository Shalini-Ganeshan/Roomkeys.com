import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between  items-center">
        <span
          className="text-xl md:text-4xl font-playwriteDEGrund text-center md:text-left md:ml-[-122px] text-white font-bold tracking-tight mb-4 md:mb-0"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          <Link to="/">RoomKeys.com</Link>
        </span>
        <span className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 md:mr-[-96px]">
          {isLoggedIn ? (
            <>
              <Link
                className="flex bg-yellow-400 border-2 text-center justify-center border-black items-center text-black rounded-lg hover:bg-yellow-300 text-sm md:text-md px-2 py-2 md:px-3 md:py-3"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex bg-yellow-400 border-2 justify-center text-center border-black items-center text-black rounded-lg hover:bg-yellow-300 text-sm md:text-md px-2 py-2 md:px-3 md:py-3"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-yellow-400 border-2 border-black items-center text-black rounded-lg hover:bg-yellow-300 text-sm md:text-md px-2 py-2 md:px-3 md:py-3"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
