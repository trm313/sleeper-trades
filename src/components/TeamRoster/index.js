import React from "react";
import { useStoreState } from "easy-peasy";

import Player from "./Player";
import TeamAnalysis from "./TeamAnalysis";

const TeamRoster = ({ team }) => {
  const appState = useStoreState((state) => state.appState);

  let benchMap = team.playersMap.filter((x) => !team.startersMap.includes(x));

  /**
   * TODO: Should do something like:
   * let starters = startersMap
   * let reserve = team.playersMap.filter(p => team.reserve.includes(p.player_id))
   * let bench = team.playersMap.filter(x => !team.startersMap.includes(x));
   * bench = bench.filter(x => !reserve.includes(x))
   *
   * then render a list for Starters, Bench, and Reserve
   */

  return (
    <div className='flex flex-col'>
      <h4 className='font-bold text-gray-200 py-4'>
        {team.ownerMap?.display_name}
        <span className='text-xs ml-2 font-medium'>
          ({team.settings?.wins}-{team.settings?.losses}
          {team.settings?.ties > 0 && `-${team.settings?.ties}`})
        </span>
      </h4>
      <TeamAnalysis team={team} />
      <div className='flex flex-col'>
        <h6 className='font-medium text-gray-200 text-xs'>Starters</h6>
        {team.startersMap.map((player) => (
          <Player
            key={player ? player?.player_id : "empty"}
            isEmptyRosterSpot={player?.player_id ? false : true}
            isInjuredReserve={team.reserve?.includes(player?.player_id)}
            player={player}
            showValue={true}
            currentWeek={appState.currentWeek}
            leagueFormat={appState.leagueFormat}
          />
        ))}
      </div>
      <div className='flex flex-col'>
        <h6 className='font-medium text-gray-200 text-xs'>Bench</h6>
        {benchMap.map((player) => (
          <Player
            key={player ? player?.player_id : "empty"}
            isEmptyRosterSpot={player?.player_id ? false : true}
            isInjuredReserve={team.reserve?.includes(player?.player_id)}
            player={player}
            benched={true}
            showValue={true}
            currentWeek={appState.currentWeek}
            leagueFormat={appState.leagueFormat}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamRoster;
