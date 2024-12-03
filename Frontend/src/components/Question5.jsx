import PropTypes from "prop-types";
import ReactSlider from "react-slider";

export const Question5 = ({ responses, onChange }) => {
  const handleSliderChange = (values) => {
    onChange("rango_anios", { desde: values[0].toString(), hasta: values[1].toString() });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="flex text-2xl font-light mb-2">Select the range of years that you prefer</h2>
      <h2 className="flex text-xl font-extralight mb-20">You have to select a range of release dates for movies</h2>

      <div className="flex w-full flex-col items-center space-y-2">
        <div className="w-full max-w-lg mx-auto items-center justify-center mb-20">
          <ReactSlider
            className="my-slider"
            value={[
              Number(responses.rango_anios.desde || 1900),
              Number(responses.rango_anios.hasta || 2024),
            ]}
            onChange={handleSliderChange}
            min={1900}
            max={2024}
            step={1}
            renderTrack={(props, state) => {
              const trackColor =
                state.index === 0
                  ? "bg-gray-950"
                  : state.index === 1
                  ? "bg-gradient-to-r from-primary-lightpink to-yellow-400"
                  : "bg-gray-950";
            
              return (
                <div
                  {...props}
                  key={`track-${state.index}`} // Agrega un key único aquí
                  className={`h-4 rounded-lg ${trackColor}`}
                />
              );
            }}
            renderThumb={(props, state) => {
              const { ...rest } = props; // Extraer key
              const thumbColor = state.index === 0 ? "bg-primary-lightpink" : "bg-yellow-400"; // Colores para las bolitas
              return (
                <div
                  {...rest} // Aplicar todas las demás propiedades
                  className={`w-8 h-8 inset-y-[-8px] rounded-full cursor-pointer ${thumbColor}`}
                >
                </div>
              );
            }}
          />
        </div>

        <div className="flex justify-between w-full max-w-lg mx-auto text-2xl">
          <div className="flex items-center">
            <label className="m-2">From:</label>
            <input
              type="number"
              value={responses.rango_anios.desde}
              onChange={(e) =>
                onChange("rango_anios", { ...responses.rango_anios, desde: e.target.value })
              }
              className="rounded px-2 py-2 text-primary-lightpink"
              placeholder="Start year"
              min="1900"
              max="2024"
            />
          </div>
          <div className="flex items-center">
            <label className="m-2">To:</label>
            <input
              type="number"
              value={responses.rango_anios.hasta || 2024}
              onChange={(e) =>
                onChange("rango_anios", { ...responses.rango_anios, hasta: e.target.value })
              }
              className="rounded px-2 py-2 text-yellow-400"
              placeholder="End year"
              min="1900"
              max="2024"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Question5.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
