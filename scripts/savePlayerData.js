const axios = require('axios');
const fs = require('fs');

axios.get('https://api.sleeper.app/v1/players/nfl')
  .then(res => {
    fs.writeFileSync('../src/data/players.json', JSON.stringify(res.data))
  })
  .catch(err => {
    console.error(err);
    return;
  })
