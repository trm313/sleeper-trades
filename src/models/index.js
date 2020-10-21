import { createStore, action } from 'easy-peasy';

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
  logUserOut: action((state) => {
    state.user = userModel;
    localStorage.removeItem('username');
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
    }
    
  }),
  setPlayers: action((state, payload) => {
    state.players = payload;
  }),
  setTeams: action((state, payload) => {
    state.teams = payload;
  }),
  initializeApp: action((state) => {
    if (localStorage.getItem('username')) {
      let username = localStorage.getItem('username');
      let activeLeagueId = localStorage.getItem('activeLeagueId');
      state.activeLeagueId = activeLeagueId;
      state.user.username = username;

      if (localStorage.getItem('activeLeagueId')) {
        // let activeLeagueId = localStorage.getItem('activeLeagueId');
        // state.activeLeagueId = activeLeagueId;
      }
    }
  })
}

export default reducer;
