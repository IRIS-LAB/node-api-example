import Pubsub from './pubsub'
import Validators from './validators'

import GroupsLBS from './groupsLBS'
import EventsLBS from './eventsLBS'

export default (dao, config, logger, exceptions) => {
  // init lbs required services
  const validators = new Validators()
  const pubsub = new Pubsub()

  return {
    groups: new GroupsLBS(validators, dao, logger, exceptions),
    events: new EventsLBS(validators, dao, pubsub, logger, exceptions)
  }
}
