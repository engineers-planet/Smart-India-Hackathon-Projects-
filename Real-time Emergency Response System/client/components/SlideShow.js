import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = () => {
  const images = [
    'banner_1.jpg',
    'banner_2.jpg',
    'banner_3.jpg',
    'banner_4.jpg',
  ];

  const zoomInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div style={{ width: '30px', marginRight: '-30px', cursor: 'pointer' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div style={{ width: '30px', marginLeft: '-30px', cursor: 'pointer' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </div>
    ),
  };
  return (
    <div className="">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className="flex justify-center w-full h-full bg-transparent"
          >
            <img
              className="w-full h-full object-cover rounded-sm shadow-xl"
              src={each}
              alt="ReachOut Home Images"
            />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;
