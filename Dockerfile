# base image
FROM node:8-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /app/

# RUN npm install
RUN npm install --loglevel verbose
RUN npm install --loglevel verbose -g serve react-scripts@3.0.1
COPY tsconfig*.json ./
COPY public/ ./public/
COPY src/ ./src/
RUN npm run build

# start app
EXPOSE 3000
CMD serve --listen=3000 --single ./build/

# Build:
# docker build --tag jobunja-front:latest .
# Run:
# docker network create jobunja-net
# docker run --detach --network=jobunja-net --publish=3000:3000 --name=front jobunja-front:latest
