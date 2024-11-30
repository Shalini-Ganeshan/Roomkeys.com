import { Link } from 'react-router-dom';
import myImage from '../image/footer.jpg';

const Footer = () => {
  return (
    <div
      className="py-3 relative"
      style={{
        backgroundImage: `url(${myImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center bottom',
      }}
    >
      <div
        className="container mx-auto flex justify-between items-center relative z-10"
        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
      >
        <span className="text-lg ml-1 sm:text-sm md:text-xl text-white font-semibold font-playwriteDEGrund tracking-tight">
          RoomKeys.com
        </span>
        <span className="text-white text-sm sm:text-[3px]  sm:mr-0 md:mr-1 sm:ml-1 md:text-sm tracking-tight flex gap-4">
          <Link to="/privacy" className="cursor-pointer">
            Privacy Policy
          </Link>
          <Link to="/termsofservice" className="cursor-pointer mr-1">
            Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
