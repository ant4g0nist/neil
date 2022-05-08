FROM node:18

WORKDIR /neil
ADD . .

# build neil
RUN yarn install
RUN yarn pack

# install neil
RUN npm install -g neil-v0.1.0.tgz
RUN rm neil-v0.1.0.tgz
ENTRYPOINT [ "neil" ]