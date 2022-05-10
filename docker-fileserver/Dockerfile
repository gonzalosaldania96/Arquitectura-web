FROM node:8
WORKDIR /usr/src/app
EXPOSE 3000/tcp
COPY ./package.json package.json
RUN npm install
COPY ./app ./app
CMD ["npm", "run", "start"]