const axios = require('axios');
const fs = require('fs');

const tradeValues = require('../src/data/tradeValues.json');

axios.get('https://api.sleeper.app/v1/players/nfl')
  .then(res => {
    fs.writeFileSync('./src/data/raw_sleeper_players.json', JSON.stringify(res.data))
  })
  .catch(err => {
    console.error(err);
    return;
  })

axios.get('https://5ahmbwl5qg.execute-api.us-east-1.amazonaws.com/dev/rankings')
  .then(res => {
    fs.writeFileSync('./src/data/raw_fantasycalc_data.json', JSON.stringify(res.data))
  })
  .catch(err => {
    console.error(err);
    return;
  })


// https://5ahmbwl5qg.execute-api.us-east-1.amazonaws.com/dev/rankings
// Res.data.players{} have an nfl_id that equals the espn_id from the Sleeper response data

  // TODO: Do the tradeValues joining right here, rather than on user requests
  // Can also use this offline approach to gathering player weekly scores, and any other data that'd be useful
  // DOESN"T WORK BECAUSE PLAYERS IS AN OBJECT

//   const tradeValues = require('../src/data/tradeValues.json');

// axios.get('https://api.sleeper.app/v1/players/nfl')
//   .then(res => {
//     promiseCreateRosteredPlayerObject(res.data)
//       .then(data => {
//         fs.writeFileSync('./src/data/players.json', JSON.stringify(data))
//       })
//       .catch(err => {
//         console.error(err);
//         return;
//       })
//     // fs.writeFileSync('./src/data/players.json', JSON.stringify(res.data))
//   })
//   .catch(err => {
//     console.error(err);
//     return;
//   })

  // const promiseCreateRosteredPlayerObject = (players) => {
  //   const tetheredCreateRosteredPlayerObject = (resolve, reject) => {
  //     let data = players.map(player => {
  //       // Search to see if tradeValues exists for player
  //       let firstName = player.search_first_name ? player.search_first_name : player.first_name;
  //       let lastName = player.search_last_name ? player.search_last_name : player.last_name;
  //       let name = firstName + " " + lastName;

  //       let tradeStats = tradeValues.find(p => p.Name.toLowerCase() === name.toLowerCase());

  //       if (tradeStats) {
  //         player.tradeStats = tradeStats;
  //       }
  //       return player;
  //     })  
  //     resolve(data);
  //   }
  //   return new Promise(tetheredCreateRosteredPlayerObject);
  // }