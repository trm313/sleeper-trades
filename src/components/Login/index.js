import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import sleeperLogo from '../../images/Sleeper-Logo_w-Text.png';
import sleeperUsernameDemo from '../../images/Sleeper-Username-box_Demo.png';
import appDemo from '../../images/Homepage_Demo@2x.png'; 

const Login = () => {
  const [input, setInput] = useState('');

  const user = useStoreState(state => state.user);
  const setUsername = useStoreActions((actions) => actions.setUsername);

  const onSubmit = (e) => {
    e.preventDefault();

    setUsername(input);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <h1 className="font-bold text-4xl">Sleeper Trades</h1>
      <img src={appDemo} className="w-full sm:w-3/4 md: w-2/3 lg:w-1/2 transform skew-x-6 shadow-2xl rounded-lg sm:rounded-2xl" alt="App demo" />
      <div className="flex flex-wrap items-center justify-center text-3xl mt-4">
        <i className="fas fa-bolt mr-4" />
        <h2 className="text-3xl mr-2">Powered by</h2>
        <a href="https://sleeper.app" target="__blank">
          <img src={sleeperLogo} alt="Sleeper Logo" className="h-10" />
        </a>
      </div>
      <p className="text-xs text-gray-300 mt-2 mb-12">
        Not affiliated with <a href="https://sleeper.app" target="__blank">Sleeper</a>
      </p>
      <form className="flex w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 justify-center" onSubmit={onSubmit}>
        <div className="input-btn-group">
          <input 
            type="text"
            id="username"
            name="username"
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="form-input p-4 text-lg" 
            placeholder="Sleeper username" 
          />
          <button className="btn btn-primary btn-cta btn-gradient-primary hover:translate-y-0" type="submit">Go</button>
        </div>
        
      </form>
      <div className="flex w-full justify-center mt-16">
        <div className="">
          <h6 className="text-sm uppercase font-medium mb-2">How do I find my Sleeper username?</h6>
          <p className="text-sm mb-4 text-gray-200">
            Look for this tray in the corner of the Sleeper app or website
          </p>
          <img src={sleeperUsernameDemo} className="shadow-xl" />
        </div>
        
      </div>
    </div>
  )
}

export default Login;