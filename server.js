// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//     console.log("oi");

//     response.write("hello world");
//     return response.end();
// });

// const PORTA = 3333;

// server.listen(PORTA);

import { fastify } from "fastify";
//import { DataBaseMemory } from "./databaseMemory.js";
import { DatabasePostgres } from "./databasePostgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const { title, description, duration } = request.body;

  const videoId = request.params.id;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videoID = request.params.id;

  await database.delete(videoID);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
