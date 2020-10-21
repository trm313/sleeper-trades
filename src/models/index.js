import { createStore, action, thunk, useStoreActions } from 'easy-peasy';

const userModel = {
  id: null,
  username: null
}


const reducer = {
  user: userModel,
  activeLeagueId: null,
  leagues: [],
  players: {},
  teams: [],
  setUsername: action((state, payload) => {
    state.user.username = payload;
    localStorage.setItem('username', payload);
  }),
  clearUser: action((state) => {
    state.user = userModel;
    localStorage.removeItem('username');
  }),
  logUserOut: thunk((actions) => {
    actions.clearUser();
    actions.setLeagues([]);
    actions.setActiveLeagueId(null);
    actions.setPlayers([]);
    actions.setTeams([]);
    // state.activeLeagueId = null;
    // state.leagues = [];
    // state.players = [];
    // state.teams = [];
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
      localStorage.setItem('activeLeagueId', payload);
    } else {
      localStorage.removeItem('activeLeagueId');
    }
  }),
  setPlayers: action((state, payload) => {
    state.players = payload;
  }),
  setTeams: action((state, payload) => {
    state.teams = payload;
  })
}

export default reducer;
