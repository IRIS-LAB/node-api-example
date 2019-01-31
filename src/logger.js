import appRoot from 'app-root-path'
import moment from 'moment-timezone'
import config from './config'
import { createLogger, format, transports } from 'winston'

const localTimeZone = 'Europe/Paris'
const { splat, combine, timestamp, printf, colorize } = format

const logFileName = 'resources.log'

const myFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level} ${message}`
})

const appendTimestamp = format((info, opts) => {
  if (opts.tz)
    info.timestamp = moment()
      .tz(opts.tz)
      .format()
  return info
})

// How to specify format per transport?
const options = {
  file: {
    level: config.logLevel,
    filename: `${appRoot}/log/` + logFileName,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    maxsize: 52428800, // 50MB
    maxFiles: 5
  },
  console: {
    level: config.logLevel,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    format: combine(colorize(), myFormat)
  }
}

export default createLogger({
  level: config.logLevel,
  format: combine(appendTimestamp({ tz: localTimeZone }), splat(), myFormat),
  transports: [new transports.File(options.file), new transports.Console(options.console)],
  exitOnError: false // do not exit on handled exceptions
})
