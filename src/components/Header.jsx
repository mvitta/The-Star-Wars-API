import React from 'react';
import icon from '../images/darth-vader.png';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href='https://swapi.dev/'>https://swapi.dev/</a>
          </li>
        </ul>
      </nav>
      <section>
        <div className='section-icon'>
          <img src={icon} alt='' />
        </div>
      </section>
    </header>
  );
};

export default Header;
