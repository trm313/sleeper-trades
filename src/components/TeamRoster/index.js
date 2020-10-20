import React from 'react';
import {positionStyles} from '../../constants'

const Player = ({ player, benched = false }) => {

  let name = player.full_name ? player.full_name : player.first_name + " " + player.last_name;
  
  let bgColor;
  let posText = positionStyles[player.position].text;
  if (player.injury_status === "IR") {
    bgColor = positionStyles.IR.bgColor;
    // posText = positionStyles.IR.text;
  } else if ( benched ) {
    bgColor = positionStyles.BN.bgColor;
    // posText = positionStyles.BN.text;
  } else {
    bgColor = positionStyles[player.position].bgColor;
    posText = positionStyles[player.position].text;
  }

  let injStatus = player.injury_status || null;
  if (player.injury_status === 'Questionable') {
    injStatus = "Q"
  } else if (player.injury_status === 'Doubtful') {
    injStatus = "D"
  } else if (player.injury_status === 'Probable') {
    injStatus = 'P'
  }

  return (
    <div className="flex items-center mb-2">
      <div 
        className="w-10 h-6 rounded text-2xs flex items-center justify-center flex-shrink-0 mr-1" 
        style={{ 
          backgroundColor: bgColor,
          borderBottom: benched ? `3px solid ${ positionStyles[player.position].bgColor }` : "none"
        }}
      >
        { posText }
      </div>
      <div className="">
        <p
          className="truncate" 
          title={ name }
         >
            { name }
        </p>
      <p className="text-2xs text-gray-400">
        {player.position} - {player.team}
        {player.injury_status && <span className="text-red-600 ml-2 uppercase">{ injStatus }</span>}
      </p>
      </div>
      
    </div>
  )
}

const TeamRoster = ({ team }) => {
  let benchMap = team.playersMap.filter(x => !team.startersMap.includes(x));

  return (
    <div className="flex flex-col">
      <h6 className="font-bold text-gray-200 py-4">{team.ownerMap?.display_name}</h6>
      <div className="flex flex-col">
        { team.startersMap.map(player => (
          <Player player={player} />
        ))}
      </div>
      <div className="flex flex-col">
        { benchMap.map(player => (
          <Player player={player} benched={true} />
        ))}
      </div>
    </div>
  )
}


export default TeamRoster