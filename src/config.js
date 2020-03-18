const pkg = require('../package')

export default {
  appname: pkg.name,
  expressPort: process.env.PORT || 8080,
  expressUrl: process.env.URL || 'http://localhost',
  databaseHost: process.env.DATABASE_HOST || 'localhost',
  databasePort: process.env.DATABASE_PORT || 5432,
  databaseName: process.env.DATABASE_NAME || 'docker',
  databaseUser: process.env.DATABASE_USER || 'docker',
  databasePoolMax: process.env.DATABASE_PASSWORD || '',
  databasePoolMin: process.env.DATABASE_POOL_MIN || 1,
  databasePassword: process.env.DATABASE_POOL_MAX || 5,
  logLevel: process.env.LOG_LEVEL || 'debug',
  streamTimeout: process.env.STREAM_TIMEOUT || 40000
}
