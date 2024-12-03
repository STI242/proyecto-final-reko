import PropTypes from 'prop-types';

const CheckboxImage = ({ type, value, checked, onChange, imageSrc, altText, name }) => {
  return (
    <label className="flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:scale-110 justify-center text-center">
      <input
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <img
        src={imageSrc}
        alt={altText}
        className={`w-36  ${checked ? "border-[3px] border-white-500" : ""}`}
      />
      <h2 className='text-base font-light mt-4 bg-primary-lightpink w-fit py-1 px-3 rounded-full'>{name ? name : value} </h2>
    </label>
  );
};

CheckboxImage.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default CheckboxImage;