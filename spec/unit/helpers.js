import sinon from 'sinon'
import Models from '../../src/data/models'
import Exceptions from '../../src/exceptions'

export default () => {
  const logger = {
    info: jest.fn(msg => null),
    error: jest.fn(msg => null),
    debug: jest.fn(msg => null)
  }

  const database = sinon.fake()
  database.define = sinon.fake.returns({ Groups: {}, Events: {} })

  const exceptions = new Exceptions()

  function initModels() {
    return new Models(database)
  }

  return { initModels, logger, exceptions }

  //export default { }
}
