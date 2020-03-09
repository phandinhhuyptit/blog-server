FROM node:10.16.0

WORKDIR /blog-server/

ADD . /blog-server/

RUN npm install -g yarn
RUN yarn install
RUN yarn build

CMD ["yarn","start"]

