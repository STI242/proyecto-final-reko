import PropTypes from 'prop-types';
import { useState } from 'react';

export const Question4 = ({ responses, onChange }) => {
  const [rating, setRating] = useState(responses.calificacion_minima || 0);  // Estado para la calificación seleccionada

  const handleStarClick = (value) => {
    setRating(value);
    onChange("calificacion_minima", value);  // Actualiza el valor de la calificación en el estado
  };

  return (
    <div className="flex flex-col text-center w-full items-center ">
      <h2 className="flex text-2xl font-light mb-2">Select your the minimun range that your prefer</h2>
      <h2 className="flex text-xl font-extralight mb-20">Your have to select a amount between 0 - 10 of rating movie </h2>
      <div className="flex justify-center space-x-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <button
            key={value}
            onClick={() => handleStarClick(value)}
            className={`w-8 h-8 text-6xl  ${rating >= value ? 'text-primary-lightpink' : 'text-gray-300'} rounded-full`}
          >
            {value <= rating ? '★' : '☆'} 
          </button>
        ))}
        
      </div>
      <div className="mt-12 text-2xl">
        {rating + '/10'} 
      </div>

    </div>
  );
};

Question4.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
