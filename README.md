# music-genres.com

## Install

- `git clone git@github.com:paulintrognon/music-genres.com.git`
- `cd music-genres.com`
- `npm install`

### Setup

#### Shared config
- `cp server/config.json.example server/config.json`
- `nano server/config.json`

#### Api config
- `cp server/api.json.example server/api.json`
- `nano server/api.json`

You need to fill in `database` fields accordigly, pointing to an empty MySQL or MariaDB database.

- `npm run update-db`

## Start

### Api

- `npm run api`

### Front

- `npm start`

## Build for prod

- `npm run build`
