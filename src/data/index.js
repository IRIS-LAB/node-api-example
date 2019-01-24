import Models from './models'
import Database from './database'

import GroupsDAO from './groupsDAO'

export default async (config, logger, exceptions) => {
  // init database
  const database = new Database(logger, config)
  await database.sync({})

  // init dao required services
  const models = new Models(database)

  return { groups: new GroupsDAO(models, logger, exceptions) }
}
