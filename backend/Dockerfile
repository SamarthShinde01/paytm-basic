FROM node:20-alpine

WORKDIR /src/app

COPY package* .
RUN npm install

COPY . .

# ENV PORT=
# ENV MONGO_URI=
# ENV JWT_SECRET=
# ENV NODE_ENV=

EXPOSE 5000

CMD ["npm","run","server"]
