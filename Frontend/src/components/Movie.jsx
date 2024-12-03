import PropTypes from "prop-types";

export const Movie = ({ title, releaseYear, rating, type, genres, platform, size }) => {
  const isBig = size === 'big';

  return (
    <section className="flex flex-col items-center">
      <div
        className={`bg-gray-950 shadow-md rounded-lg px-4 pt-4 flex flex-col items-center text-center text-white  h-[360px] ${
          isBig ? 'w-[230px] space-y-4' : 'w-[185px] h-[318px] space-y-4'
        }`}
      >
        <h2 className={`font-medium text-primary-lightpink  flex items-center justify-center ${
          isBig ? 'text-2xl h-24' : 'text-xl h-20'
        }`}>
          {title}
        </h2>

        <div>
          <h2 className={`${isBig ? 'text-lg' : 'text-base'} font-extralight`}>
            {type === 'movie' ? 'Movie' : type === 'tv' ? 'Serie' : 'Movie/Serie'}
          </h2>
          <p className={`${isBig ? 'text-base' : 'text-sm'} text-gray-500 items-center`}>
            {releaseYear}
          </p>
        </div>

        <p className={`py-2 text-gray-600 flex items-center justify-center ${
          isBig ? 'text-4xl' : 'text-3xl'
        }`}>
          <span className={`text-primary-lightpink mr-2 ${isBig ? 'text-6xl' : 'text-5xl'}`}>
            {'★'}
          </span>
          {rating || '1.5'}
        </p>

        <p className={`${isBig ? 'text-lg' : 'text-base'} items-center mb-4`}>
          {genres || 'Genres'}
        </p>
      </div>

      <h2 className={`font-light mt-4  bg-primary-lightpink w-fit py-1 px-3 rounded-full ${
        isBig ? 'text-lg' : 'text-base'
      }`}>
        {platform || 'Platform'}
      </h2>
    </section>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired,
  rating: PropTypes.string,
  type: PropTypes.string,
  genres: PropTypes.string,
  platform: PropTypes.string,
  size: PropTypes.string,
};