import { action, thunk } from "easy-peasy";

const userModel = {
  id: null,
  username: null,
};

// TODO: Calculate week to update automatically on Wednesdays
const appStateModel = {
  fullScreenLoader: false,
  currentWeek: null, // 'Week 7'
  leagueFormat: null, // 'standard', 'halfppr', 'ppr'
};

const reducer = {
  user: userModel,
  activeLeagueId: null,
  leagues: [],
  players: {},
  teams: [],
  appState: appStateModel,
  setUsername: action((state, payload) => {
    state.user.username = payload;
    localStorage.setItem("username", payload);
  }),
  clearUser: action((state) => {
    state.user = userModel;
    localStorage.removeItem("username");
  }),
  logUserOut: thunk((actions) => {
    actions.clearUser();
    actions.setLeagues([]);
    actions.setActiveLeagueId(null);
    actions.setPlayers([]);
    actions.setTeams([]);
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setLeagues: action((state, payload) => {
    state.leagues = payload;
  }),
  setActiveLeagueId: action((state, payload) => {
    state.activeLeagueId = payload;
    if (payload) {
      localStorage.setItem("activeLeagueId", payload);
    } else {
      localStorage.removeItem("activeLeagueId");
    }
  }),
  setPlayers: action((state, payload) => {
    state.players = payload;
  }),
  setTeams: action((state, payload) => {
    state.teams = payload;
  }),
  setLeagueFormat: action((state, payload) => {
    state.appState.leagueFormat = payload;
  }),
  setCurrentWeek: action((state, payload) => {
    state.appState.currentWeek = payload;
  }),
};

export default reducer;
