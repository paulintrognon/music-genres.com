# API documentation

All responses are like so:

```js
{
  "status": 200, // or 400, 403, 404, ...
  "result": {
    // result goes here
  }
}
```

## Music Genres

### Create

**POST** /music-genres/create
```js
{
  "name": "Jazz",
  "parentIds": [1, 2, 3] // optional
}
```

### Get

**GET** /music-genres/:id/with-tracks

### Search

**GET** /music-genres/search?query=:query
