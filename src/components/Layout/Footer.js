import React, { useState } from "react";
import LegalStatements from "./LegalStatements";

const Footer = () => {
  const [showLegalStatements, setShowLegalStatements] = useState(false);

  return (
    <div className='flex justify-between'>
      <div className='flex relative items-center'>
        {showLegalStatements && (
          <LegalStatements handleClose={() => setShowLegalStatements(false)} />
        )}
        <button
          className='text-green-600 hover:text-green-400 text-xs bg-gray-700 py-2 px-4'
          onClick={() => setShowLegalStatements(true)}
        >
          Terms of Use | Privacy Policy | Cookie Policy
        </button>
        <p className='text-xs'>
          &copy; {new Date().getFullYear()} Hubbub Studios
        </p>
      </div>
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
};

export default Footer;
