import Envie from 'envie'
import Joi from 'joi'

const pkg = require('../package')

export const config = Envie({
  PORT: Joi.number()
    .min(0)
    .default(8080)
    .description('Port on which the HTTP server will listen'),
  URL: Joi.string()
    .default('http://localhost')
    .description('Url on wich the HTTP server will listen'),
  DATABASE_HOST: Joi.string()
    .default('localhost')
    .description('Database Host'),
  DATABASE_PORT: Joi.number()
    .default('5432')
    .description('Database Port'),
  DATABASE_NAME: Joi.string()
    .default('docker')
    .description('Database Name'),
  DATABASE_USER: Joi.string()
    .default('docker')
    .description('Database User'),
  DATABASE_PASSWORD: Joi.string()
    .default('')
    .description('Database Password'),
  DATABASE_POOL_MIN: Joi.number()
    .min(0)
    .default(0)
    .description('Database pool min'),
  DATABASE_POOL_MAX: Joi.number()
    .min(1)
    .default(5)
    .description('Database pool max'),
  LOG_LEVEL: Joi.string()
    .only('fatal', 'error', 'warn', 'info', 'debug', 'trace')
    .default('debug')
    .description('Level of verbosity for the logs'),
  STREAM_TIMEOUT: Joi.number()
    .min(1000)
    .default(40000)
    .description('Stream timeout in ms')
})

export default {
  appname: pkg.name,
  expressUrl: config.get('URL'),
  expressPort: config.get('PORT'),
  databaseHost: config.get('DATABASE_HOST'),
  databasePort: config.get('DATABASE_PORT'),
  databaseName: config.get('DATABASE_NAME'),
  databaseUser: config.get('DATABASE_USER'),
  databasePoolMax: config.get('DATABASE_POOL_MAX'),
  databasePoolMin: config.get('DATABASE_POOL_MIN'),
  databasePassword: config.get('DATABASE_PASSWORD'),
  logLevel: config.get('LOG_LEVEL'),
  streamTimeout: config.get('STREAM_TIMEOUT')
}
