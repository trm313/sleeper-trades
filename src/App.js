import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { loadTeamsWithPlayers } from './controllers/playersController';

import Home from './pages';
import Layout from './components/Layout';

const SLEEPER_API = 'https://api.sleeper.app/v1';




function App() {
  const user = useStoreState(state => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);

  const leagues = useStoreState(state => state.leagues);
  const setLeagues = useStoreActions((actions) => actions.setLeagues);

  const [selectedLeague, setSelectedLeague] = useState(null);

  const players = useStoreState(state => state.players);
  const setPlayers = useStoreActions((actions) => actions.setPlayers);

  const teams = useStoreState(state => state.teams);
  const setTeams = useStoreActions((actions) => actions.setTeams);



  useEffect(() => {
    const fetchUserData = async () => {
      let userRes = await axios.get(`https://api.sleeper.app/v1/user/${user.username}`);
      setUser({
        id: userRes.data.user_id,
        username: userRes.data.username,
        avatar: userRes.data.avatar
      });
    }

    fetchUserData();
  }, [])

  useEffect(() => {
    const fetchUserLeagues = async () => {
      let leaguesRes = await axios.get(`https://api.sleeper.app/v1/user/${user.id}/leagues/nfl/2020`);
      setLeagues(leaguesRes.data);
      setSelectedLeague(leaguesRes.data[0]?.league_id)
    }

    if (user.id) fetchUserLeagues();
  }, [user.id])

  useEffect(() => {
    // TODO: CHANGE leagues[1] to leagues[0] when i'm not testing
    if (leagues.length > 0) getLeagueTeams(leagues[1].league_id, setTeams);
  }, [leagues])

  const getLeagueTeams = async (league_id, cb) => {
    let league = await leagues.find(l => l.league_id === league_id);
    if (!league) {
      league = await axios.get(`${SLEEPER_API}/league/${league_id}`);
    }

    let rostersRes = await axios.get(`${SLEEPER_API}/league/${league_id}/rosters`);
    let teamsData = await loadTeamsWithPlayers(rostersRes.data);
    if (cb) cb(teamsData);
    return teamsData;
  }

  const handleSelectLeague = async (id) => {
    setSelectedLeague(id);
    await getLeagueTeams(id, setTeams);
  }

  return (
    <Layout onChangeLeague={handleSelectLeague} selectedLeague={selectedLeague}>
      <Home />
    </Layout>
  );
}

export default App;
 