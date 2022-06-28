import React from 'react';
import lightSaber1 from '../images/light-saber 1.png';
import lightSaber2 from '../images/light-saber 2.png';
import lightSaber3 from '../images/light-saber 3.png';

const Footer = () => {
  return (
    <footer>
      <div>
        <img
          className='section-saber'
          src={lightSaber1}
          alt='light-saber 1.png'
        />
      </div>
      <div>
        <img
          className='section-saber'
          src={lightSaber2}
          alt='light-saber 2.png'
        />
      </div>
      <div>
        <img
          className='section-saber'
          src={lightSaber3}
          alt='light-saber 3.png'
        />
      </div>
    </footer>
  );
};

export default Footer;
