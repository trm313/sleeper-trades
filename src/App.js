import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { loadTeamsWithPlayers } from './controllers/playersController';

import Home from './pages';
import Layout from './components/Layout';
import Login from './components/Login';

const SLEEPER_API = 'https://api.sleeper.app/v1';




function App() {
  const user = useStoreState(state => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);
  const setUsername = useStoreActions((actions) => actions.setUsername);

  const leagues = useStoreState(state => state.leagues);
  const setLeagues = useStoreActions((actions) => actions.setLeagues);

  const activeLeagueId = useStoreState(state => state.activeLeagueId);
  const setActiveLeagueId = useStoreActions((actions) => actions.setActiveLeagueId);

  const setTeams = useStoreActions((actions) => actions.setTeams);

  useEffect(() => {
    if (localStorage.getItem('username')) {
      let storage_username = localStorage.getItem('username');
      setUsername(storage_username);
      
      if (localStorage.getItem('activeLeagueId')) {
        let storage_activeLeagueId = localStorage.getItem('activeLeagueId');
        setActiveLeagueId(storage_activeLeagueId);
      }
    }
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      let userRes = await axios.get(`https://api.sleeper.app/v1/user/${user.username}`);
      setUser({
        id: userRes.data.user_id,
        username: userRes.data.username,
        avatar: userRes.data.avatar
      });
    }

    user.username && fetchUserData();
  }, [user.username])

  useEffect(() => {
    const fetchUserLeagues = async () => {
      let leaguesRes = await axios.get(`https://api.sleeper.app/v1/user/${user.id}/leagues/nfl/2020`);
      setLeagues(leaguesRes.data);
    }

    if (user.id) fetchUserLeagues();
  }, [user.id])

  useEffect(() => {
    if (!localStorage.getItem('activeLeagueId') && !activeLeagueId && leagues) {
      setActiveLeagueId(leagues[0]?.league_id);
    }
  }, [leagues, activeLeagueId])

  useEffect(() => {
    if (leagues.length > 0 && activeLeagueId ) getLeagueTeams(activeLeagueId, setTeams);
  }, [leagues, activeLeagueId])

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
    if (id) {
      setActiveLeagueId(id);
      await getLeagueTeams(id, setTeams);
    }
  }



  // let league = leagues.find(league => league.id === selectedLeague)
  // console.log(league);
  let FORMAT = "halfppr";
  let WEEK = 'Week 6';
  // if (league.scoring_settings.rec === 0) FORMAT = "standard";
  // if (league.scoring_settings.rec === 1) FORMAT = "ppr";
  // if (selectedLeague.scoring_settings.rec === 0) FORMAT = "standard"; 
  console.log('user', user);

  return (
    <Layout onChangeLeague={handleSelectLeague} selectedLeague={activeLeagueId}>
      { !user.username ? (
        <Login />
      ) : (
        <Home />
      )}
      
    </Layout>
  );
}

export default App;
 