import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

import Helpers from './helpers'

import GroupsDAO from '../../src/data/groupsDAO'

const expect = chai.expect
const helpers = new Helpers()
const exceptions = helpers.exceptions
const logger = helpers.logger
// the library chaiAsPromised allow to test async function with throwed exception
chai.use(chaiAsPromised)

describe('GroupsLBS', () => {
  let models
  beforeEach(() => {
    models = helpers.initModels()
  })

  describe('findById', () => {
    describe('When there is no group', () => {
      it('throw MissingResourceError exception', async () => {
        models.Groups.findByPk = sinon.fake.returns(null)
        const groupsDAO = new GroupsDAO(models, logger, exceptions)
        await expect(groupsDAO.findById(1)).to.be.rejectedWith(Error)
      })
    })
    describe('When there is one group', () => {
      it('return { group }', async () => {
        const groupBe = {
          toJSON() {
            return { code: 'my Code' }
          }
        }
        models.Groups.findByPk = sinon.fake.returns(groupBe)
        const groupsDAO = new GroupsDAO(models, logger, exceptions)
        await expect(groupsDAO.findById(1)).to.be.not.rejectedWith(Error)
        const result = await groupsDAO.findById(1)
        expect(result).to.eql(groupBe.toJSON())
      })
    })
  })

  describe('findAll', () => {
    describe('When there is no group', () => {
      it('return []', async () => {
        models.Groups.findAll = sinon.fake.returns([])
        const groupsDAO = new GroupsDAO(models, logger, exceptions)
        const result = await groupsDAO.findAll()
        expect(result).to.be.empty
      })
    })
    describe('When there is one group', () => {
      it('return [ group ]', async () => {
        models.Groups.findAll = sinon.fake.returns([{ code: 'code' }])
        const groupsDAO = new GroupsDAO(models, logger, exceptions)
        const result = await groupsDAO.findAll()
        expect(result).to.be.not.empty
        expect(result).to.have.lengthOf(1)
      })
    })
  })

  describe('create', () => {
    describe('When the creation is ok', () => {
      it('return id', async () => {
        models.Groups.create = sinon.fake.returns({ id: 1 })
        const groupsDAO = new GroupsDAO(models, logger, exceptions)
        const result = await groupsDAO.create(null)
        expect(result).to.be.equal(1)
      })
    })
  })
})
