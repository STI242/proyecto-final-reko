import PropTypes from "prop-types";
import dots from '../assets/dots.png'

import { useEffect, useState } from 'react'
import { profileImages } from '../services/profileImg';

export const GroupsList = ({ groups, selectedGroup, setSelectedGroup}) => {

  
  const profileImagesArray = Object.values(profileImages);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled;
  };

  
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    setShuffledImages(shuffleArray(profileImagesArray));
  }, []); 
  

  return (
    <div className="flex flex-col w-[220px] h-[40rem] px-2 items-center bg-gray-950 rounded-lg">
      <img className="w-16 mb-5 mt-6 self-center" src={dots} />
      <h2 className="text-2xl font-light mb-2">Groups</h2>
      <div className="flex flex-col items-center justify-start overflow-y-auto max-h-[40rem] w-full hide-scrollbar pt-4">
        {groups.map((group, index) => (
          <figure
            className={`flex flex-col items-center justify-center text-center ${
              index === 0 ? 'mt-2' : 'my-4'
            }`}
            key={index}
          >
            <img
              onClick={() => setSelectedGroup(index)}
              className={`px-1 py-1 rounded w-28 ${
                index === selectedGroup ? 'border-[4px] border-white' : ''
              }`}
              src={shuffledImages[index]}
              alt={`Profile ${index + 1}`}
            />
            <span className="text-center mt-2">{group.group_name} </span>
          </figure>
        ))}

      </div>
    </div>
  );
};

GroupsList.propTypes = {
  groups: PropTypes.array.isRequired,
  selectedGroup: PropTypes.number.isRequired,
  setSelectedGroup: PropTypes.func.isRequired,
};