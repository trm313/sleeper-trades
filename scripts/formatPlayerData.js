const axios = require("axios");
const fs = require("fs");

let rawFantasyCalcData = require("../src/data/raw_fantasycalc_data.json");
let rawSleeperData = require("../src/data/raw_sleeper_players.json");

const findFantasyCalcStats = (fullname) => {
  let matches = rawFantasyCalcData.playersList.filter(
    (player, index) => player.indexOf(fullname) !== -1
  );

  let stats;

  if (matches.length > 1) {
    stats = joinPartialFantasyCalcStats(matches);
  } else {
    stats = rawFantasyCalcData.players[matches[0]];
  }

  return stats;
};

const joinPartialFantasyCalcStats = (matches) => {
  let stats = rawFantasyCalcData.players[matches[0]];

  for (let i = 1; i < matches.length; i++) {
    let matchStats = rawFantasyCalcData.players[matches[i]];
    let matchValues = matchStats.values;

    for (let [week, obj] of Object.entries(matchValues)) {
      if (
        obj.hasOwnProperty("standard") &&
        obj["standard"].hasOwnProperty("value")
      ) {
        stats.values[week] = matchValues[week];
      }
    }
  }

  return stats;
};

for (var id in rawSleeperData) {
  let player = rawSleeperData[id];

  let fullname = player.first_name + " " + player.last_name;
  fullname = fullname.replace(/[.]/g, "");

  player.stats_fantasyCalc = findFantasyCalcStats(fullname);
}

fs.writeFileSync(
  "./src/data/formatted_players.json",
  JSON.stringify(rawSleeperData)
);

/**Sleeper data
 * "id": {
 * active,
 * position,
 * status,
 * team
 * depth_chart_order
 * first_name,
 * last_name,
 * full_name,
 * search_first_name,
 * search_last_name,
 * search_full_name,
 * injury_notes,
 * injury_status,
 * pandascore_id,
 * player_id,
 * espn_id,
 * stats_id,
 * yahoo_id,
 * fantasy_data_id
 * }
 */

/**
 * FantasyCalc data
 * {
 *   playersList: [String],
 *   players: {
 *     "Player Name": {
 *       name,
 *       position,
 *       nfl_id, // equal to espn_id in sleeper
 *       team,
 *       seasonPts,
 *       stats: { enumeration }
 *       values: {
 *         "Week #": {
 *           standard: { value },
 *           halfppr: { value },
 *           ppr: { value }
 *         }
 *       }
 *     }
 *   }
 * }
 */

/*
  let ty = "1110":{"position":"WR","birth_date":"1989-11-14","practice_participation":null,"college":"Florida International","rotowire_id":8098,"injury_status":null,"depth_chart_order":1,"pandascore_id":null,"status":"Active","birth_city":null,"fantasy_data_id":14005,"search_last_name":"hilton","age":30,"yahoo_id":25802,"search_full_name":"tyhilton","espn_id":14924,"injury_body_part":null,"active":true,"hashtag":"#TYHilton-NFL-IND-13","news_updated":1603068009999,"sport":"nfl","metadata":null,"high_school":"Miami Springs (FL)","years_exp":8,"birth_state":null,"birth_country":null,"player_id":"1110","full_name":"T.Y. Hilton","height":"5'10\"","fantasy_positions":["WR"],"gsis_id":"00-0029608","injury_notes":null,"rotoworld_id":7558,"last_name":"Hilton","depth_chart_position":"LWR","search_rank":59,"first_name":"T.Y.","practice_description":null,"injury_start_date":null,"weight":"183","team":"IND","search_first_name":"ty","sportradar_id":"b8426cea-f8b9-4061-8d56-e70d1230103e","number":13,"stats_id":468655}
  */
