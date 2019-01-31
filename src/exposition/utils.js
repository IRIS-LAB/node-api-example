import cors from 'cors'
import bodyParser from 'body-parser'

export default (logger, { EntityNotFoundBusinessException, TechnicalException }) => {
  return {
    parseJSON: bodyParser.json(),
    logRequests: (req, res, next) => {
      logger.debug(
        `request:${JSON.stringify({
          method: req.method,
          host: req.headers.host,
          url: req.url,
          body: req.body,
          params: req.params
        })}`
      )
      next()
    },
    errorHandler: (err, req, res, next) => {
      if (res.headersSent) {
        return next(err)
      }
      logger.error(`${err.data || err.message} : ${err.stack}`)
      let status = 400
      if (err instanceof TechnicalException) {
        status = 500
      } else if (err instanceof EntityNotFoundBusinessException) {
        status = 404
      }

      res.status(status).send({ data: err.data || err.message })
    },
    enableCors: cors(),
    returnApplicationJson: (req, res, next) => {
      res.set('Content-Type', 'application/json')
      next()
    }
  }
}
