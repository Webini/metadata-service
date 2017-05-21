Systeme
=======

dep : Guessit

Contracts
=========
## Dependencies

This microservice bind the [FILE_EXCHANGE](#env) exchange and retreive all `file.create` and `file.deleted` messages

#### file.created
The message must contains:
```json
{
  "objectId": "UUID <String(36)>",
  "data": {
    "basename": "Full file name without path <String>",
    "length": "File size <unsigned int64>"
  } 
}
```

##### file.deleted dependency
The message must contains:
```json
{
  "objectId": "UUID<String(36)>"
}
```

### 

API
===
@todo

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
RABBITMQ_URL            |                | RabbitMQ url (format like `amqp://localhost:5672` )
FILE_EXCHANGE           | transmission-service | Exchange used for retreiving files to process
METADATA_EXCHANGE       | metadata       | Exchange name of this service
SENTRY_URL              |                | Sentry url (`https://<key>@sentry.io/<project>`)
ELASTICSEARCH_HOST     | localhost:9200  |  Specify the host that this client will connect to. Auto sniffing is activated.
ELASTICSEARCH_AUTH     |                 | Specifies the default http auth as a String with username and password separated by a colon (eg. user:pass). Applies to any host defined in the original config, and any hosts discovered while sniffing.