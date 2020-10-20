import axios from 'axios';
import PLAYERS from '../data/formatted_players.json';

const parseRosteredPlayerIds = (leagueRosters) => {
  return leagueRosters.map(l => l.players).flat()
}

const promiseCreateRosteredPlayerObject = (idArray) => {
  const tetheredCreateRosteredPlayerObject = (resolve, reject) => {
    let data = {};
    for(let i=0; i < idArray.length; i++) {
      if (!data.hasOwnProperty(idArray[i])) {
        // Assign base player metadata
        data[idArray[i]] = PLAYERS[idArray[i]];
      }
    }

    resolve(data);
  }
  return new Promise(tetheredCreateRosteredPlayerObject);
}

const promiseReturnRosteredPlayersAsIdArray = (leagueRosters) => {
  const tetheredReturnRosteredPlayers = (resolve, reject) => {
    let idArray = parseRosteredPlayerIds(leagueRosters);
    resolve(idArray);
  }
  return new Promise(tetheredReturnRosteredPlayers);
}

const promiseCompileRosters = (leagueRosters, playersObj) => {
  const tetheredCompileRosters = (resolve, reject) => {
    let rosters = leagueRosters.map(roster => {
      roster.playersMap = roster.players.map(p => playersObj[p] )
      roster.startersMap = roster.starters.map(p => playersObj[p])
      return roster;
    })

    resolve(rosters);
  }
  return new Promise(tetheredCompileRosters)
}

const promiseJoinOwnerData = (teams, owners) => {
  const tetheredJoinOwnerData = (resolve, reject) => {
    let joinedData = teams.map(team => {
      team.ownerMap = owners.find(o => o.user_id === team.owner_id)
      return team;
    })

    resolve(joinedData);
  }
  return new Promise(tetheredJoinOwnerData);
}


export const loadTeamsWithPlayers = async (leagueRosters) => {
  let idArray = await promiseReturnRosteredPlayersAsIdArray(leagueRosters);
  let dataObj = await promiseCreateRosteredPlayerObject(idArray);
  let teams = await promiseCompileRosters(leagueRosters, dataObj);
  // let teamsWithStats = await promiseJoinTradeValuesToPlayers(teams);
  // console.log('teamsWithStats', teamsWithStats);

  let owners = await axios.get(`https://api.sleeper.app/v1/league/${leagueRosters[0].league_id}/users`)
  let teamsWithOwners = await promiseJoinOwnerData(teams, owners.data);
  return teamsWithOwners;
}

