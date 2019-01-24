import Utils from './utils'

import actuator from 'express-actuator'
import ActuatorEBS from './actuatorEBS'
import GroupsEBS from './groupsEBS'
import EventsEBS from './eventsEBS'

export default (lbs, config, logger, exceptions) => {
  // init ebs required services
  const utils = new Utils(logger, exceptions)

  const actuatorEBS = new ActuatorEBS(logger)
  const groupsEBS = new GroupsEBS(lbs, utils, logger, exceptions)
  const eventsEBS = new EventsEBS(lbs, utils, config, logger, exceptions)

  return {
    route(app) {
      // common utils
      app.use(utils.parseJSON)
      app.use(utils.logRequests) // log debug request
      app.use(utils.enableCors)
      app.use(utils.returnApplicationJson)

      // actuator
      app.get('/actuator/health', actuatorEBS.health)
      app.use(actuator('/actuator'))

      // groups
      app.get('/groups', groupsEBS.findAll)
      app.post('/groups', groupsEBS.create)
      app.get('/groups/:id', groupsEBS.findById)
      app.delete('/groups/:id', groupsEBS.remove)
      app.put('/groups/:id', groupsEBS.update)

      // events
      app.get('/events/events-stream', eventsEBS.stream)
      app.post('/events/events-stream', eventsEBS.testStream)
    }
  }
}
