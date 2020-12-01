# music-genres.com

[![Actions Status](https://github.com/paulintrognon/music-genres.com/workflows/CI/badge.svg)](https://github.com/paulintrognon/music-genres.com/actions)

## Get started

- `git clone git@github.com:paulintrognon/music-genres.com.git`
- `cd music-genres.com`
- `yarn`

### Configurations

There are two configurations files to add:

- `cp server/.env.example server/.env`
- `cp pwa/.env.example pwa/.env`

### Start server

`cd server && docker-compose up`

### Start pwa

`cd pwa && docker-compose up`
