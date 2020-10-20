import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Column = (props) => (
  <div className="">
    {props.children}
  </div>
)

const LeagueItem = ({ league, onSelect }) => (
  <div className="px-4 py-2" onClick={() => onSelect(league.league_id)}>
    <h4 className="">{league.name}</h4>
    <p className="text-xs text-gray-200">{league.total_rosters} team, {league.scoring_settings.rec} ppr</p>
  </div>
)

const LeagueList = ({ leagues, onChangeLeague }) => (
  <div className="flex flex-col">
    { leagues.map(league => (
      <LeagueItem key={league.league_id} league={league} onSelect={onChangeLeague} />
    ))}
  </div>
)

const Layout = ({ children, onChangeLeague }) => {
  const user = useStoreState(state => state.user);
  const leagues = useStoreState(state => state.leagues);

  return (
    <div className="h-screen w-screen inset-0 bg-gray-700 text-white font-sans flex overflow-x-hidden">
      <Column>
        <LeagueList leagues={leagues} onChangeLeague={onChangeLeague} />
      </Column>
      <main className="w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

export default Layout;