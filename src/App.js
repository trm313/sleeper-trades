import React, { useEffect } from "react";
import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";

import { loadTeamsWithPlayers } from "./controllers/playersController";

import appSettings from "./data/appSettings.json";

import Home from "./pages";
import Layout from "./components/Layout";
import Login from "./components/Login";

const SLEEPER_API = "https://api.sleeper.app/v1";

function App() {
  const user = useStoreState((state) => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);
  const setUsername = useStoreActions((actions) => actions.setUsername);

  const appState = useStoreState((state) => state.appState);
  const setLeagueFormat = useStoreActions((actions) => actions.setLeagueFormat);
  const setCurrentWeek = useStoreActions((actions) => actions.setCurrentWeek);

  const leagues = useStoreState((state) => state.leagues);
  const setLeagues = useStoreActions((actions) => actions.setLeagues);

  const activeLeagueId = useStoreState((state) => state.activeLeagueId);
  const setActiveLeagueId = useStoreActions(
    (actions) => actions.setActiveLeagueId
  );

  const setTeams = useStoreActions((actions) => actions.setTeams);

  const handleSelectLeague = async (id) => {
    if (id) {
      setActiveLeagueId(id);
      await getLeagueTeams(id, setTeams);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      let storage_username = localStorage.getItem("username");
      setUsername(storage_username);

      if (localStorage.getItem("activeLeagueId")) {
        let storage_activeLeagueId = localStorage.getItem("activeLeagueId");
        setActiveLeagueId(storage_activeLeagueId);
      }
    }
  }, [setUsername, setActiveLeagueId]);

  useEffect(() => {
    const calculateWeekNumber = () => {
      // PROBLEM: If this updates before the data does, none of the players have the new week's data
      // let now = new Date();
      // let originalStartDate = new Date("09-SEP-2020 12:00:00 GMT-0400");
      // let weeksElapsed = Math.abs(differenceInWeeks(originalStartDate, now));
      // return weeksElapsed + 1;
      return appSettings.currentWeek;
    };

    if (!appState.currentWeek) {
      let weekNumber = calculateWeekNumber();
      setCurrentWeek(`Week ${weekNumber}`);
    }
  }, [setCurrentWeek, appState.currentWeek]);

  useEffect(() => {
    const fetchUserData = async () => {
      let userRes = await axios.get(
        `https://api.sleeper.app/v1/user/${user.username}`
      );
      setUser({
        id: userRes.data.user_id,
        username: userRes.data.username,
        avatar: userRes.data.avatar,
      });
    };

    user.username && fetchUserData();
  }, [user.username, setUser]);

  useEffect(() => {
    const fetchUserLeagues = async () => {
      let leaguesRes = await axios.get(
        `https://api.sleeper.app/v1/user/${user.id}/leagues/nfl/2020`
      );
      setLeagues(leaguesRes.data);
    };

    if (user.id) fetchUserLeagues();
  }, [user.id, setLeagues]);

  useEffect(() => {
    if (!localStorage.getItem("activeLeagueId") && !activeLeagueId && leagues) {
      setActiveLeagueId(leagues[0]?.league_id);
    }
  }, [leagues, activeLeagueId, setActiveLeagueId]);

  useEffect(() => {
    if (leagues.length > 0 && activeLeagueId)
      getLeagueTeams(activeLeagueId, setTeams);
  }, [leagues, activeLeagueId, setTeams]);

  useEffect(() => {
    const determineAndSetLeagueFormat = async (
      league_id = activeLeagueId,
      cb
    ) => {
      let league = await leagues.find((l) => l.league_id === league_id);
      if (league) {
        let rec = league.scoring_settings.rec;
        let leagueFormat;
        if (rec === 0) leagueFormat = "standard";
        if (rec === 0.5) leagueFormat = "halfppr";
        if (rec === 1) leagueFormat = "ppr";

        cb(leagueFormat);
      } else {
        return;
      }
    };
    if (activeLeagueId)
      determineAndSetLeagueFormat(activeLeagueId, setLeagueFormat);
  }, [leagues, activeLeagueId, setLeagueFormat]);

  const getLeagueTeams = async (league_id, cb) => {
    let rostersRes = await axios.get(
      `${SLEEPER_API}/league/${league_id}/rosters`
    );
    let teamsData = await loadTeamsWithPlayers(rostersRes.data);
    if (cb) cb(teamsData);
    return teamsData;
  };

  return (
    <Layout onChangeLeague={handleSelectLeague} selectedLeague={activeLeagueId}>
      {!user.username ? <Login /> : <Home />}
    </Layout>
  );
}

export default App;
