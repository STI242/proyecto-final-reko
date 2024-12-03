import { NavLink } from "react-router-dom";
import portada from '../assets/Portada.png'
import logo from '../assets/reko.png'

export const Intro = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary-back text-white px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${portada})` }}></div>


      <div className="relative z-10 items-start mt-32 ml-28 w-[600px] h-fit">
        <img className="w-full" src={logo} alt="" />
        <h1 className="text-4xl font-bold mb-4">
          Find the perfect movie to enjoy with your friends!
        </h1>
        <h2 className="text-xl md:text-2xl mb-24 text-white-300">
          {`Tell us your group's preferences, and Reko will do the rest.`}
        </h2>
      
          <NavLink
            to="/questionnaire"
            className=" bg-primary-lightpink hover:bg-primary-darkpink text-white py-3 px-5 rounded-lg text-3xl font-medium shadow-lg transition duration-300"
          >
            Find your Reko!
          </NavLink>

          <NavLink
            to="/history"
            className=" bg-white opacity-50 ml-12 hover:bg-primary-darkpink hover:text-white text-primary-lightpink py-3 px-5 rounded-lg text-3xl font-medium shadow-lg transition duration-300"
          >
            View your Reko!
          </NavLink>
      </div>

    </div>
      
  );
};