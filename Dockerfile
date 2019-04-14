FROM node:10.15.3-alpine

ADD . /usr/src/app/
RUN cd /usr/src/app/ && npm i -g serve

EXPOSE 3000
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
ENTRYPOINT [ "sh", "-c", "npm i -g serve && serve -l 3000" ]

# RUN apk update && apk upgrade && \
#    apk add --no-cache git
