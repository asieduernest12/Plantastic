// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import connection from "./config/connection.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "./utils/auth.js";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.use(
  "/graphql",
  authMiddleware, //check and set the user onto context if the token is present and valid
  expressMiddleware(server, 
  //   {
  //   context: async ({ req }) => ({ token: req.headers.token }),
  // }
  )
);

app.post("/api/fetchplant", async (req, res) => {
  const key = process.env.APIKEY;
  const url = `https://house-plants2.p.rapidapi.com/search?query=${req.body.searchTerm}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "house-plants2.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  if (response.ok) {
    const data = await response.json();

    res.send({ data });
  } else {
    console.error("failed");
  }
});
await connection;
await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
