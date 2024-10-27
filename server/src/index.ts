import { fastify } from 'fastify';
import * as dotenv from 'dotenv';
import { Settings } from './model/Settings';
import * as fs from 'fs';

dotenv.config({
  path: __dirname + "/../.env"
})

let settings = new Settings()
const settingsPath = __dirname + '/../settings.json'
if (!fs.existsSync(settingsPath)) {
  const json = JSON.stringify(settings)
  fs.writeFileSync(settingsPath, json)
}
else {
  const json = fs.readFileSync(settingsPath, 'utf8')
  settings = JSON.parse(json)
}

const server = fastify()

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    console.log('Server started successfully')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

const key = "asdasd"

server.post('/settings', {}, async (request, reply) => {
  try {
    console.log(request.body)
    return reply
      .code(200)
      .send(key)
  } catch (error) {
    request.log.error(error)
    return reply.send(500)
  }
})

server.get('/settings', {}, async (request, reply) => {
  try {
    console.log(request.body)
    return reply
      .code(200)
      .send(JSON.stringify(settings))
  } catch (error) {
    request.log.error(error)
    return reply.send(500)
  }
})