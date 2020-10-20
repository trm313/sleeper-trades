import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Row = (props) => (
  <div className="">
    {props.children}
  </div>
)

const LeagueItem = ({ league, onSelect, selected }) => (
  <button className={`px-6 py-4 mr-2 rounded-lg focus:outline-none ${selected ? 'bg-gray-800' : 'bg-gray-600'}`} onClick={() => onSelect(league.league_id)}>
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

  return (
    <div className="h-screen w-screen inset-0 bg-gray-700 text-white font-sans flex flex-col overflow-x-hidden">
      <Row>
        <LeagueList leagues={leagues} onChangeLeague={onChangeLeague} selectedLeague={selectedLeague} />
      </Row>
      <main className="w-full overflow-x-hidden">
        {children}
      </main>
      <Row>
        <div className="flex items-center justify-around">
          <p>Trade Values Updated: 10/20/20</p>
          <p>Team Data From SleeperApp</p>
          <p>Trade Data From <a href="https://www.fantasycalc.com/" target="__blank">FantasyCalc</a></p>
          <p>Trade Values From <a href="https://www.reddit.com/user/PeakedInHighSkool/" target="__blank">u/PeakedInHighSkool</a></p>
        </div>
      </Row>
    </div>
  )
}

export default Layout;