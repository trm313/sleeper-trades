import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import LeagueList from "./LeagueList";
import Footer from "./Footer";
import appSettings from "../../data/appSettings.json";

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
      <div className='mt-2 flex flex-col items-end'>
        <p className='text-xs uppercase'>
          Trade Values Updated:{" "}
          <span className='text-green-600 text-sm font-medium'>
            {appSettings.dataUpdated}
          </span>
        </p>
        <p className='text-xs uppercase'>
          Current Week:{" "}
          <span className='text-green-600 text-sm font-medium'>
            Week {appSettings.currentWeek}
          </span>
        </p>
      </div>
      <main className='w-full flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
