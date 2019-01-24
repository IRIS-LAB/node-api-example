import express from 'express'

import Lbs from './src/business'
import config from './src/config'
import Dao from './src/data'
import Exceptions from './src/exceptions'
import Ebs from './src/exposition'
import logger from './src/logger'

/*
var profiler = require('gc-profiler')
profiler.on('gc', function(info) {
  console.log(info)
})
*/

// import basicAuth from 'express-basic-auth'

const Api = async () => {
  // init common elements
  const exceptions = new Exceptions()

  // define all layers
  const dao = await new Dao(config, logger, exceptions)
  const lbs = new Lbs(dao, config, logger, exceptions)
  const ebs = new Ebs(lbs, config, logger, exceptions)

  // define routes to app
  const app = express()
  ebs.route(app)
  return app
}

const port = config.expressPort
const url = config.expressUrl

Api().then(app => {
  app.listen(port, () => {
    logger.info(`${config.appname} started on ${url}:${port}`)
  })
})

// pour exposer en basic Auth
// app.use(basicAuth(basicAuthConfig))
