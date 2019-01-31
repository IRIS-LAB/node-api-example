import Sequelize from 'sequelize'

export default (logger, config) => {
  return new Sequelize(config.databaseName, config.databaseUser, config.databasePassword, {
    host: config.databaseHost,
    port: config.databasePort,

    dialect: 'postgres',

    pool: {
      max: config.databasePoolMax,
      min: config.databasePoolMin,
      acquire: 30000,
      idle: 10000
    },

    logging: msg => logger.debug(msg), // by default, log to debug queries

    operatorsAliases: false
  })
}
