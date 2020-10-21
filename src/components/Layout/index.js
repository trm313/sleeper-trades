import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Footer = (props) => (
  <div className="flex justify-between">
    <p>Trade Values Updated: 10/20/20</p>
    <div className="flex flex-col items-end text-xs">
      <p>Player data from <a href="https://sleeper.app" target="__blank">Sleeper API</a></p>
      <p>Trade data from <a href="https://www.fantasycalc.com/" target="__blank">FantasyCalc</a></p>
      <p>Trade values from <a href="https://www.reddit.com/user/PeakedInHighSkool/" target="__blank">u/PeakedInHighSkool</a></p>
    </div>
  </div>
)

const LeagueItem = ({ league, onSelect, selected }) => (
  <button className={`flex-col items-start px-6 py-4 mr-2 rounded-lg focus:outline-none ${selected ? 'bg-gray-800' : 'bg-gray-600'}`} onClick={() => onSelect(league.league_id)}>
    <h4 className="text-sm font-medium">{league.name}</h4>
    <p className="text-2xs text-gray-200">{league.total_rosters} team, {league.scoring_settings.rec} ppr</p>
  </button>
)

const LeagueList = ({ leagues, onChangeLeague, selectedLeague }) => (
  <div className="flex">
    { leagues.map(league => (
      <LeagueItem key={league.league_id} league={league} onSelect={onChangeLeague} selected={selectedLeague === league.league_id} />
    ))}
  </div>
)

const Layout = ({ children, onChangeLeague, selectedLeague }) => {
  const user = useStoreState(state => state.user);
  const leagues = useStoreState(state => state.leagues);
  
  const logUserOut = useStoreActions(actions => actions.logUserOut);

  return (
    <div className="h-screen w-screen inset-0 bg-gray-700 text-white font-sans flex flex-col justify-between overflow-x-hidden p-4">
      <div className="flex justify-between items-center">
        <LeagueList leagues={leagues} onChangeLeague={onChangeLeague} selectedLeague={selectedLeague} />
        { user.username && <button className="py-2 px-4 text-sm uppercase text-gray-800" onClick={() => logUserOut()}>Logout</button> }
      </div>
      <main className="w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout;