import Pubsub from './pubsub'
import Validators from './validators'

import Dao from '@/data'

import GroupsLBS from './groupsLBS'
import EventsLBS from './eventsLBS'

export default async (config, logger, exceptions) => {
  // init lbs required services
  const validators = new Validators()
  const pubsub = new Pubsub()
  const dao = await new Dao(config, logger, exceptions)

  return {
    groups: new GroupsLBS(validators, dao, logger, exceptions),
    events: new EventsLBS(validators, dao, pubsub, logger, exceptions)
  }
}
