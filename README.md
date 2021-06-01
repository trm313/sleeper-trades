## Sleeper Trades

The best part of Fantasy is trading. This web app hopes to help you easily find good trade partners, and make fair trade offers.

Live Site: [sleeper-trades.netlify.app](sleeper-trades.netlify.app)

#### Attributions

NFL player and Sleeper league data is sourced from the [Sleeper](https://sleeper.app) API, which makes league data available to the public in a read-only fashion

Trade values are aggregated by [u/PeakedInHighSkool](https://www.reddit.com/user/PeakedInHighSkool/) on a weekly basis during the season

Those trade values are accessed via the API built by [u/TheRealMonty](https://old.reddit.com/user/TheRealMonty/) for his site [FantasyCalc](https://www.fantasycalc.com/)

## Running and Building the Application

From the project directory:

### `npm start`

Runs the app in the development mode, kicking off scripts `watch:css` for Tailwind, and `start:react` for the React application.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the application to `\build` directory. This command builds both the Tailwind CSS output file via `build:css` and the React project via `build:react`

## Updating the Trade Values

Note: Keep an eye on [FantasyCalc](https://www.fantasycalc.com/) to see if he's updated his data yet.

From the project directory:

### `npm run data:savePlayerData`

This accesses the API u/TheRealMonty built which formats the trade value data from u/PeakedInHighSchool and saves it to the `src\data` directory

### `npm run data:formatPlayerData`

This accesses the data that was just saved from the previous script, and formats it in a way more suited to this application's needs. There are some discrepencies in the data source that are cleaned up at this stage.
