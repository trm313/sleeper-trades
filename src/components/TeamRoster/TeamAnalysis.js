import React from "react";
import { useStoreState } from "easy-peasy";
import {
  calculateTotalTeamValue,
  calculatePositionalNeeds,
} from "../../controllers/calcController";

const TeamAnalysis = ({ team }) => {
  const appState = useStoreState((state) => state.appState);

  /* Not in use yet ->
  const leagues = useStoreState((state) => state.leagues);
  const activeLeagueId = useStoreState((state) => state.activeLeagueId);

  let league = leagues.find((l) => l.league_id === activeLeagueId);
  let positionalNeeds = calculatePositionalNeeds(league.roster_positions, {
    currWeek: appState.currWeek,
    leagueFormat: appState.leagueFormat,
  });
  */

  let totalValue = calculateTotalTeamValue(team.playersMap, {
    currWeek: appState.currWeek,
    leagueFormat: appState.leagueFormat,
  });

  return (
    <div className='my-2 flex flex-col w-48'>
      <div className='flex items-center'>
        <p className='text-xs mr-2'>Total Team Value:</p>
        <div className='bg-gray-700 py-1 px-2 flex items-center justify-center rounded text-xs'>
          {totalValue}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysis;
