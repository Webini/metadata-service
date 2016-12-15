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

Variable | Default | Description
-------- | ------- | -----------
MONGO_URL | mongodb://localhost/metadata | 
TMDB_API_KEY | | TheMovieDb api key
TMDB_DEFAULT_RETRY_DELAY | 20 | When we cannot retreive the retry-after header, this provide the default timeout value
TMDB_KILL_RETRY_AFTER | 20 | Cancel the request retry after 20 failed requests