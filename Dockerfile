FROM node:9.9.0

# Create app directory
WORKDIR /usr/app

# Bundle app source
COPY . .

RUN ls
RUN yarn
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start:production" ]