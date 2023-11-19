FROM node:alpine

RUN npm install -g npm@10.1.0

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/frontend && cp -a /tmp/node_modules /opt/frontend/

WORKDIR /opt/frontend
ADD . /opt/frontend
