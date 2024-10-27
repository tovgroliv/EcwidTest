import { fastify } from 'fastify';
import * as dotenv from 'dotenv';
import { Settings } from './model/Settings';
import * as fs from 'fs';

dotenv.config({
  path: __dirname + "/../.env"
})

let settings: Settings = new Settings()
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
    await server.listen({
      port: 3000,
      host: "localhost"
    })
    console.log('Server started successfully')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()

server.post('/settings', {}, async (request, reply) => {
  try {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")
    
    const temp:Settings = JSON.parse(`${request.body}`) as Settings
    if (temp != undefined) {
      settings = temp
      fs.writeFileSync(settingsPath, JSON.stringify(settings))
    }

    return reply
      .code(200)
      .send()
  } catch (error) {
    request.log.error(error)
    return reply.send(500)
  }
})

server.get('/settings', {}, async (request, reply) => {
  try {
    reply.header("Access-Control-Allow-Origin", "*")
    reply.header("Access-Control-Allow-Methods", "POST")
    return reply
      .code(200)
      .send(JSON.stringify(settings))
  } catch (error) {
    request.log.error(error)
    return reply.send(500)
  }
})