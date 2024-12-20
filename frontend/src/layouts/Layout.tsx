import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import myImage from "../image/layout.jpg";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        style={{
          backgroundImage: `url(${myImage})`,
        }}
        className="w-90 h-[40vh] md:h-auto bg-cover bg-center flex flex-col "
      >
        <Header />

     <div className="hidden md:block">
          <Hero />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 sm:px-12 max-w-7xl"> {/* Adjust max-w to control width */}
        <SearchBar />
      </div>

      <div className="container mx-auto py-10 px-4 md:px-8 sm:px-5 flex-1 max-w-7xl"> {/* Adjust max-w to control width */}
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
