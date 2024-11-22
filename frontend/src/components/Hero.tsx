const Hero = () => {
  return (
    <div className="bg-transparent pb-10">
      <div className="container mx-auto flex flex-col gap-2 lg:ml-0">
        <h1
          className="lg:text-2xl md:text-3xl sm:text-xl  lg:text-left sm:text-center lg:text-white sm:text-gray-600"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Discover your next destination
        </h1>
        <p
          className="lg:text-lg md:text-xl sm:text-md sm:text-center lg:text-left lg:text-white sm:text-gray-600"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
        >
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};

export default Hero;
