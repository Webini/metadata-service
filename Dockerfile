FROM node:7.10.0

ENV SERVER_PORT 8080
ENV SERVER_HOST 0.0.0.0

VOLUME [ "/home/node/server/data" ]

ADD "src" "/home/node/server/src"
ADD [ \
  "package.json", \
  "server.js", \
  "/home/node/server/" \
]

RUN chown -R node. /home/node/server

USER node
WORKDIR /home/node/server

RUN touch .env && \
    npm i 

EXPOSE 8080
CMD [ "node", "server.js", "--run-with-migrations" ]