import PropTypes from 'prop-types'
import movieImg from '../assets/movie.png'
import serieImg from '../assets/serie.png'
import CheckboxImage from './CheckboxImage';


export const Question3 = ({ responses, onChange }) => {
  const options = ["movie", "tv"];

return (
  <div className="flex flex-col w-full items-center justify-center">
    <h2 className="flex text-2xl font-light mb-2">Select your favorite format(s)</h2>
    <h2 className="flex text-xl font-extralight mb-6">You can select one or both</h2>
    <div className="flex items-center space-x-24">
      {options.map((option) => (
        <CheckboxImage
          key={option}
          type="checkbox" // Cambiado a checkbox
          value={option.toLowerCase()}
          checked={responses.formato.includes(option.toLowerCase())} // Verificar si el formato está en el array
          onChange={(e) => {
            const newFormatos = e.target.checked
              ? [...responses.formato, e.target.value] // Añadir si está seleccionado
              : responses.formato.filter((f) => f !== e.target.value); // Quitar si se deselecciona
            onChange("formato", newFormatos);
          }}
          imageSrc={option == "movie" ? movieImg : serieImg}
          name={option == "movie" ? "Movies" : "Series"}
          altText="Format"
        />
      ))}
    </div>
  </div>
);
};

Question3.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}