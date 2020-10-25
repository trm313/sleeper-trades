import React from "react";

const Footer = (props) => (
  <div className='flex justify-between'>
    <p className='text-sm uppercase'>
      Trade Values Updated:{" "}
      <span className='text-green-600 font-medium'>10/20/20</span>
    </p>
    <div className='flex flex-col items-end text-xs'>
      <p>
        Player data from{" "}
        <a href='https://sleeper.app' target='__blank'>
          Sleeper API
        </a>
      </p>
      <p>
        Trade data from{" "}
        <a href='https://www.fantasycalc.com/' target='__blank'>
          FantasyCalc
        </a>
      </p>
      <p>
        Trade values from{" "}
        <a
          href='https://www.reddit.com/user/PeakedInHighSkool/'
          target='__blank'
        >
          u/PeakedInHighSkool
        </a>
      </p>
    </div>
  </div>
);

export default Footer;
