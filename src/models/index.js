import { createStore, action } from 'easy-peasy';

const userModel = {
  id: null,
  username: 'trm313'
}


const reducer = {
  user: userModel,
  leagues: [],
  players: {},
  teams: [],
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  setLeagues: action((state, payload) => {
    state.leagues = payload;
  }),
  setPlayers: action((state, payload) => {
    state.players = payload;
  }),
  setTeams: action((state, payload) => {
    state.teams = payload;
  })
}

export default reducer;
