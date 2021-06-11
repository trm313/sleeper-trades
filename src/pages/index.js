import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import TeamRoster from "../components/TeamRoster";
import FullscreenLoader from "../components/Loading/fullscreenLoader";

const Home = () => {
  const user = useStoreState((state) => state.user);
  const teams = useStoreState((state) => state.teams);
  const logUserOut = useStoreActions((actions) => actions.logUserOut);

  if (teams.length === 0 || !user.id) {
    return <FullscreenLoader onCancel={() => logUserOut()} />;
  }

  const myTeam = teams.find((t) => t.owner_id === user.id);
  const otherTeams = teams.filter((t) => t.owner_id !== user.id);

  return (
    <div className='my-4 shadow-xl'>
      <div className='flex bg-gray-600 rounded-xl p-4'>
        <div className='z-20 px-4 rounded-xl bg-gray-800 shadow-2xl'>
          <TeamRoster key={`team-${myTeam.owner_id}`} team={myTeam} />
        </div>
        <div className='pl-4 flex w-full overflow-x-auto scrolling-touch'>
          {otherTeams.map((team) => (
            <TeamRoster key={`team-${team.owner_id}`} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
