FROM node:16.0.0-alpine
WORKDIR /app
COPY . /app
RUN chmod +x /app
RUN yarn install
RUN yarn build

# Enable container web port to allow host machine can connect to
EXPOSE 4400

# Run `yarn start` and the App serve at port 4400 as config in server/index.js
CMD [ "yarn", "start" ]

# RUN yarn global add firebase-tools
# RUN export GOOGLE_APPLICATION_CREDENTIALS=firebase-service-account.json
# RUN firebase deploy --only hosting
