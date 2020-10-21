import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Login = () => {
  const [input, setInput] = useState('');

  const user = useStoreState(state => state.user);
  const setUsername = useStoreActions((actions) => actions.setUsername);

  const onSubmit = (e) => {
    e.preventDefault();

    setUsername(input);
  }

  return (
    <div className="w-full h-64 flex justify-center items-center">
      <form className="flex" onSubmit={onSubmit}>
        <input 
          type="text"
          id="username"
          name="username"
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="p-4 text-lg" 
          placeholder="Sleeper Username" 
        />
        <button className="p-4 text-gray-800 uppercase" type="submit">Go</button>
      </form>
      
    </div>
  )
}

export default Login;