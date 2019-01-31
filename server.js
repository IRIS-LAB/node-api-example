import express from 'express'

import config from '@/config'
import Exceptions from '@/exceptions'
import Ebs from '@/exposition'
import logger from '@/logger'

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

  // define ebs layer
  const ebs = await new Ebs(config, logger, exceptions)

  // define routes to app
  const app = express()
  ebs.route(app)
  return app
}

const port = config.expressPort
const url = config.expressUrl

logger.info(`Try to start ${config.appname}  on ${url}:${port}`)

Api().then(app => {
  app.listen(port, () => {
    logger.info(`${config.appname} started on ${url}:${port}`)
  })
})

// pour exposer en basic Auth
// app.use(basicAuth(basicAuthConfig))
