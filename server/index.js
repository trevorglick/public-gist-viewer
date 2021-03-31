import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import data from "./singledata.json";

import routes from "./routes";
import { resolvers, schema } from "./api/graphql";
import models, { sequelize } from "./models";

const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// test getting data without hitting rate limits
app.get("/file", (req, res) => {
  res.send(data)
})

app.use("/", routes);

const eraseDatabaseOnSync = true;
 
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createFavorites();
  }
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})

const createFavorites = async () => {
  await models.favorite.create({
    id: "a74e99baa875237c5f3e42c679dc7b22",
    userName: "trevorglick",
    description: "setInterval inside a useEffect for polling data",
    favorited: true
  });

  await models.favorite.create({
    id: "2633c704a7c52424279c43955e4aa1f2",
    userName: "trevorglick",
    description: "testing multiple files",
    favorited: true
  })

  await models.favorite.create({
    id: "sdajkljldasjd3984844",
    userName: "trevorglick",
    description: "SHOULDNTSHOW",
    favorited: false
  })
};
