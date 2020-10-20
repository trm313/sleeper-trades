import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import TeamRoster from '../components/TeamRoster';

const Home = () => {
  const user = useStoreState(state => state.user);
  const teams = useStoreState(state => state.teams);

 

  if (teams.length === 0 || !user.id) {
    return (
      <div className="">
        <p>Loading</p>
      </div>
    )
  }

  const myTeam = teams.find(t => t.owner_id === user.id);
  const otherTeams = teams.filter(t => t.owner_id !== user.id);

  return (
    <div className="">
      <h1>Home</h1>
      <div className="flex">
        <div className="">
          <TeamRoster team={myTeam} />
        </div>
        <div className="flex w-full overflow-x-auto scrolling-touch">
          { otherTeams.map(team => (
            <TeamRoster team={team} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Home;