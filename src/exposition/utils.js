import cors from 'cors'
import bodyParser from 'body-parser'

export default (logger, { MissingResourceError }) => {
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
    enableCors: cors(),
    returnApplicationJson: (req, res, next) => {
      res.set('Content-Type', 'application/json')
      next()
    },
    getStatusCode: error => {
      if (error instanceof MissingResourceError) {
        return 404
      } else {
        return 400
      }
    }
  }
}
