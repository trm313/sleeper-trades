import React from "react";

const LeagueItem = ({ league, onSelect, selected }) => (
  <button
    className={`flex flex-row items-center items-start px-6 py-4 mr-2 rounded-lg focus:outline-none ${
      selected ? "bg-gray-800" : "bg-gray-600"
    }`}
    onClick={() => onSelect(league.league_id)}
  >
    <i className='fas fa-football-ball' />
    <div className='text-left ml-2'>
      <h4 className='text-sm font-medium'>{league.name}</h4>
      <p className='text-2xs text-gray-200'>
        {league.total_rosters} team, {league.scoring_settings.rec} ppr
      </p>
    </div>
  </button>
);

const LeagueList = ({ leagues, onChangeLeague, selectedLeague }) => (
  <div className='flex'>
    {leagues.map((league) => (
      <LeagueItem
        key={league.league_id}
        league={league}
        onSelect={onChangeLeague}
        selected={selectedLeague === league.league_id}
      />
    ))}
  </div>
);

export default LeagueList;
