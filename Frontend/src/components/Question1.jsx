import PropTypes from 'prop-types';
import primeImg from '../assets/prime-icon.png';
import netflixImg from '../assets/netflix-icon.png';
import hboImg from '../assets/hbo-icon.png';
import CheckboxImage from './CheckboxImage'; 

export const Question1 = ({ responses, onChange }) => {

  const handleCheckboxChange = (platform, isChecked) => {
    onChange(
      "plataformas",
      isChecked
        ? [...responses.plataformas, platform]
        : responses.plataformas.filter((p) => p !== platform)
    );
  };

  return (
    <section className="flex w-full flex-col items-center ">
      <h2 className="flex text-2xl font-light mb-2">Select your favorite platform</h2>
      <h2 className="flex text-xl font-extralight mb-20">Your can select one or more platforms</h2>

      <div className="flex justify-center items-center space-x-10">
        <CheckboxImage
          type="checkbox"
          value="Netflix"
          checked={responses.plataformas.includes("Netflix")}
          onChange={(e) => handleCheckboxChange("Netflix", e.target.checked)}
          imageSrc={netflixImg}
          altText="Netflix"
        />
        <CheckboxImage
          type="checkbox"
          value="Prime"
          checked={responses.plataformas.includes("Prime")}
          onChange={(e) => handleCheckboxChange("Prime", e.target.checked)}
          imageSrc={primeImg}
          altText="Prime Video"
        />
        <CheckboxImage
          type="checkbox"
          value="HBO"
          checked={responses.plataformas.includes("HBO")}
          onChange={(e) => handleCheckboxChange("HBO", e.target.checked)}
          imageSrc={hboImg}
          altText="HBO"
        />
      </div>
    </section>
  );
};

Question1.propTypes = {
  responses: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
