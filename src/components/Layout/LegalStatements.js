import React from "react";

const legalText = [
  {
    title: "Terms of Use",
    text: "This is a fun, free tool for you to use at your own risk. We accept no liability for any bad trades, lost championships, or broken dreams. Trade responsibly.",
  },
  {
    title: "Privacy Policy",
    text: "This website collects no personal data, or any data. We do not store your Sleeper username anywhere except in LocalStorage.",
  },
  {
    title: "Cookie Policy",
    text: "This website uses the same number of cookies as the Vikings have Super Bowl wins. For those keeping score at home, that's 0.",
  },
];

const LegalStatements = ({ handleClose }) => {
  return (
    <div className='pb-8 px-4 absolute bottom-0 z-20 bg-gray-600 shadow-xl rounded-lg'>
      <div className='absolute top-0 right-0 mt-4 mr-4 flex justify-end'>
        <button
          className='h-6 w-6 p-0 rounded-full text-gray-600 text-2xs'
          onClick={() => handleClose()}
        >
          <i className='fas fa-times text-gray-900' />
        </button>
      </div>
      {legalText.map((section) => (
        <div className=''>
          <h1>{section.title}</h1>
          <p className='pb-2'>{section.text}</p>
          <hr className='mt-4' />
        </div>
      ))}
    </div>
  );
};

export default LegalStatements;
