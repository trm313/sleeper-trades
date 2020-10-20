import React from 'react';

import Player from './Player';
import Analysis from './Analysis';

const TeamRoster = ({ team }) => {
  let benchMap = team.playersMap.filter(x => !team.startersMap.includes(x));

  return (
    <div className="flex flex-col">
      <h4 className="font-bold text-gray-200 py-4">{team.ownerMap?.display_name}</h4>
      <div className="flex flex-col">
        <h6 className="font-medium text-gray-400 text-xs">Starters</h6>
        { team.startersMap.map(player => (
          <Player player={player} showValue={true} />
        ))}
      </div>
      <div className="flex flex-col">
         <h6 className="font-medium text-gray-400 text-xs">Bench</h6>
        { benchMap.map(player => (
          <Player player={player} benched={true} showValue={true} />
        ))}
      </div>
      <div className="">
        <Analysis team={team} />
      </div>
    </div>
  )
}


export default TeamRoster;