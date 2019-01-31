const pkg = require('../package')

export default {
  appname: pkg.name,
  expressUrl: process.env.PORT,
  expressPort: process.env.URL,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseName: process.env.DATABASE_NAME,
  databaseUser: process.env.DATABASE_USER,
  databasePoolMax: process.env.DATABASE_PASSWORD,
  databasePoolMin: process.env.DATABASE_POOL_MIN,
  databasePassword: process.env.DATABASE_POOL_MAX,
  logLevel: process.env.LOG_LEVEL,
  streamTimeout: process.env.STREAM_TIMEOUT
}
