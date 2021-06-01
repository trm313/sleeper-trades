import React, { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import PlayerPopup from "./PlayerPopup";
import EmptySpot from "./EmptySpot";
import PositionPill from "./PositionPill";

const Player = ({
  player,
  benched = false,
  showValue = false,
  currentWeek = null,
  leagueFormat = null,
  isEmptyRosterSpot = false,
  isInjuredReserve = false,
}) => {
  const ref = useRef();
  const [isPlayerPopupOpen, setIsPlayerPopupOpen] = useState(false);

  useOnClickOutside(ref, () => setIsPlayerPopupOpen(false));

  // useEffect(() => {
  //   console.log("isPlayerPopupOpen changed", isPlayerPopupOpen);
  // }, [isPlayerPopupOpen]);

  const handleClosePopup = () => {
    setIsPlayerPopupOpen(false);
    console.log("handleClose");
  };

  // if (!player) {
  //   return null;
  // }
  if (isEmptyRosterSpot) {
    return <EmptySpot />;
  }

  let name = player.full_name
    ? player.full_name
    : player.first_name + " " + player.last_name;

  // let bgColor;
  // let posText = positionStyles[player.position].text;
  // if (isInjuredReserve) {
  //   bgColor = positionStyles.IR.bgColor;
  //   // posText = positionStyles.IR.text;
  // } else if (benched) {
  //   bgColor = positionStyles.BN.bgColor;
  //   // posText = positionStyles.BN.text;
  // } else {
  //   bgColor = positionStyles[player.position].bgColor;
  //   posText = positionStyles[player.position].text;
  // }

  let injStatus = player.injury_status || null;
  if (player.injury_status === "Questionable") {
    injStatus = "Q";
  } else if (player.injury_status === "Doubtful") {
    injStatus = "D";
  } else if (player.injury_status === "Probable") {
    injStatus = "P";
  }

  let tradeValue = null;
  if (
    currentWeek &&
    leagueFormat &&
    player.stats_fantasyCalc &&
    player.stats_fantasyCalc.values &&
    player.stats_fantasyCalc.values[currentWeek] &&
    player.stats_fantasyCalc.values[currentWeek][leagueFormat] &&
    player.stats_fantasyCalc.values[currentWeek][leagueFormat].value
  ) {
    let val =
      player.stats_fantasyCalc?.values[currentWeek][leagueFormat].value * 1;
    tradeValue = val;
  }

  return (
    <div
      className='flex items-center mb-2 w-48 relative cursor-pointer'
      onClick={() => setIsPlayerPopupOpen(true)}
      ref={ref}
    >
      {isPlayerPopupOpen && (
        <PlayerPopup
          player={player}
          leagueFormat={leagueFormat}
          currentWeek={currentWeek}
          onClose={handleClosePopup}
        />
      )}
      <PositionPill
        position={player.position}
        isBenched={benched}
        isReserve={isInjuredReserve}
      />
      <div className=''>
        <p
          className='w-24 truncate text-sm font-medium'
          title={`${name} - ${player.position} - ${player.team}`}
        >
          {name}
        </p>
        <p className='text-2xs text-gray-200'>
          {player.position} - {player.team}
          {player.injury_status && (
            <span className='text-red-600 ml-2 uppercase'>{injStatus}</span>
          )}
        </p>
      </div>
      {showValue && tradeValue && (
        <div
          className='ml-1 text-2xs flex justify-center items-center w-8 h-4 rounded bg-gray-700'
          title={`Trade Value: ${tradeValue} (${name})`}
        >
          {tradeValue}
        </div>
      )}
    </div>
  );
};

export default Player;
