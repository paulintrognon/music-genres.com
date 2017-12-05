# music-genres.com

## Install

- `git clone git@github.com:paulintrognon/music-genres.com.git`
- `cd music-genres.com`
- `npm install`

### Setup

#### Shared config
- `cp config/index.js.example config/index.js`
- `nano config/index.js`

#### Api config
- `cp config/api.js.example config/api.js`
- `nano config/api.js`

You need to fill in `database` fields accordigly, pointing to an empty MySQL or MariaDB database.

- `npm run update-db`

## Start

### Api

- `npm run api`

### Front

- `npm start`

## Build for prod

- `npm run build`
