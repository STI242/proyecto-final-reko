import PropTypes from "prop-types";
import CheckboxImage from "./CheckboxImage";
import { genres } from "../services/genresImgs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const Question2 = ({ responses, onChange }) => {
  const sliderSettings = {
    dots: false, 
    infinite: true, 
    slidesToShow: 5, 
    slidesToScroll: 1, 
    arrows: true, 
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 3, 
        },
      },
    ],
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="text-2xl font-light mb-2">Select your favorite genres</h2>
      <h2 className="text-xl font-extralight mb-6">
        You can select one or more genres
      </h2>
      <div className="w-[90%] max-w-[800px]"> 
        <Slider {...sliderSettings}>
          {genres.map((genre) => (
            <div key={genre.value} className="px-4 my-5"> 
              <CheckboxImage
                value={genre.value}
                type="checkbox"
                altText={genre.value}
                imageSrc={genre.img}
                checked={responses.generos.includes(genre.value)}
                onChange={(e) =>
                  onChange(
                    "generos",
                    e.target.checked
                      ? [...responses.generos, genre.value]
                      : responses.generos.filter((g) => g !== genre.value)
                  )
                }
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

Question2.propTypes = {
  responses: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
