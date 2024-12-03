import PropTypes from "prop-types";
import { Movie } from "../components/Movie";
import fondo from '../assets/Fondo.png'
import arrowLeft from '../assets/arrow-left.png'
import { useNavigate } from "react-router-dom";

export const Recommendation = ({ recommendations, groupname }) => {
  const navigate = useNavigate()
  const handleHome = () => {
    navigate('/intro')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">

      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: `url(${fondo})` }}></div>
      
      <section className="flex flex-col relative w-full px-32 z-10 mt-12 items-center h-fit">
      <h2 className="flex text-2xl font-light mb-2">Amazing Reko!</h2>
      <h2 className="flex text-xl font-extralight mb-16">This are the reccomendations for {groupname} </h2>

          {recommendations && recommendations.length > 0 ? (
            <div className="flex w-full space-x-6 items-center justify-center">
              {recommendations.map((rec, index) => (
                
                <Movie
                  key={index}
                  title={rec.title}
                  releaseYear={rec.releaseYear}
                  rating={rec.imdbAverageRating}
                  genres={rec.genres}
                  type={rec.type}
                  platform={rec.platform}
                  size={'big'}
                />
              ))}
            </div>
          ) : (
            <p className="text-white-600 text-center text-xl">No recommendations available at the moment.</p>
          )}

          <button
            onClick={handleHome}
            className="flex mt-12 items-center text-xl px-8 py-2 border-2 border-white text-white rounded-lg  hover:bg-primary-lightpink"
          >
            <img className="w-6 ml-2" src={arrowLeft} alt="" />
            Go back to home
          </button>

      </section>
      
    </div>
  );
};

Recommendation.propTypes = {
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      posterUrl: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  groupname: PropTypes.string.isRequired
};