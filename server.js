
import {fastify} from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory

const database = new DatabasePostgres
// GET, POST, PUT, DELETE


// Request Body

// POST  = CRIANDO NOVO VIDEO
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration,
   })

   return reply.status(201).send()
})

// GET
 server.get('/videos', async (request) => {
    const search = request.query.search

   const videos = await database.list(search)

    return videos
})

// Route Parameter :id

// Put 
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
}
)
// Delete
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3333,
})