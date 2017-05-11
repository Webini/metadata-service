Systeme
=======

dep : Guessit

API
===

## /filename
### POST
#### Parameters
```json
{
  "filename": "<string>"
}
``` 
#### Description
Return guessed metadata from filename

#### Return 200 
```json
{
  "success": true,
  "data": {
    "title": "< string >",
    "season": < int >,
    "episode": < int >,
    "episode_title": "< string >",
    "format": "< string >",
    "video_codec": "< string >",
    "release_group": "< string >",
    "container": "< string >",
    "mimetype": "< string >",
    "type": "< string >"
  }
}
```
 
 If we cannot found informations, corresponding field are not returned.
### Return 400
```json
{
  "data": {
    "< field >": [
      "< error messages >",
      ...
    ]
  },
  "success": false
}
``` 
### Return 500
```json
{
  "success": false,
  "data": "< string >"
}
```

## /search
### POST
#### Parameters
```json
{ 
  "type": < int >, 
  "search": "< string >"
}
```

#### Description
Search for an item, available types:
- 1: Serie
- 2: Movie

#### Return
Todo

Env
===

Variable                | Default        | Description
----------------------- | -------------- | --------------
TMDB_API_KEY            |                | TheMovieDb api key
TMDB_DEFAULT_RETRY_DELAY | 20            | When we cannot retreive the retry-after header, this provide the default timeout value
TMDB_KILL_RETRY_AFTER   | 20             | Cancel the request retry after 20 failed requests
SERVER_HOST             | localhost      | server host
SERVER_PORT             | 8080           | server port
DATABASE_DIALECT        | mariadb        | Database dialect cf [sequelize dialect](http://docs.sequelizejs.com/en/1.7.0/docs/usage/#dialects), don't forget to fork & install your connector if you are'nt going to use sqlite
DATABASE                | metadata       | Database name
DATABASE_USER           |                | Database user
DATABASE_PASSWORD       |                | Database password
DATABASE_HOST           |                | Database host
DATABASE_LOGGING        | 0              | Database logging, it will output all queries
DATABASE_PORT           |                | Database port
DATABASE_STORAGE        |                | Database storage cf sequelize doc