import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Express } from 'express';
import { User } from './user/user.js';
import JWTService from '../services/jwt.js';
import { GraphQLContext } from '../interfaces.js';
import { copyFileSync } from 'fs';


export async function start(): Promise<Express> {
  const app = express();

  const server = new ApolloServer<GraphQLContext>({
    typeDefs: `
      ${User.types}

      type Query {
        ${User.queries}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      }
    },
    introspection: true
  });

  await server.start();
  app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
          context: async ({ req }) => {
              try {
                  //console.log("Context: ", req);
                  const token = req.headers.authorization?.split("Bearer")[1].trim() || "";
                  const user = await JWTService.decodeToken(token);
                  return { user };
              } catch (error: any) {
                  console.log("Error Context: ", error);
                  return { user: undefined };
              }
          },
      })
  );
  return app
}