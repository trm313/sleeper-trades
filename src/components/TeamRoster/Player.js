import React from 'react';

import { positionStyles } from '../../constants/styleEnums'

const Player = ({ player, benched = false, showValue = false }) => {
  if (!player) return null;

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

  let tradeValue = null;
  if (player.stats_fantasyCalc?.values['Week 6']['halfppr'].value) {
    let val = player.stats_fantasyCalc?.values['Week 6']['halfppr'].value * 1
    tradeValue = val;
  }

  return (
    <div className="flex items-center mb-2 w-48">
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
          className="w-24 truncate text-sm font-medium" 
          title={ `${name} - ${player.position} - ${player.team}` }
         >
            { name }
        </p>
      <p className="text-2xs text-gray-200">
        {player.position} - {player.team}
        {player.injury_status && <span className="text-red-600 ml-2 uppercase">{ injStatus }</span>}
      </p>
      </div>
      { showValue && tradeValue &&
        <div 
          className="ml-1 text-2xs flex justify-center items-center w-8 h-4 rounded bg-gray-700"
          title={`Trade Value: ${tradeValue} (${name})`}
          >
          { tradeValue }
        </div>}
    </div>
  )
}

export default Player;