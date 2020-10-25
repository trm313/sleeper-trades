import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LeagueList from "./LeagueList";
import Footer from "./Footer";

const Layout = ({ children, onChangeLeague, selectedLeague }) => {
  const user = useStoreState((state) => state.user);
  const leagues = useStoreState((state) => state.leagues);

  const logUserOut = useStoreActions((actions) => actions.logUserOut);

  return (
    <div className='h-screen w-screen max-w-full inset-0 bg-gray-700 text-white font-sans flex flex-col justify-between overflow-x-hidden p-4'>
      <div className='flex justify-between items-center'>
        <LeagueList
          leagues={leagues}
          onChangeLeague={onChangeLeague}
          selectedLeague={selectedLeague}
        />
        {user.username && (
          <button className='btn btn-secondary' onClick={() => logUserOut()}>
            Logout
          </button>
        )}
      </div>
      <main className='w-full flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
