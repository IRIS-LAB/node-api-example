import Joi from 'joi'

export default ({ Group }, { groups }, logger, { BusinessException }) => {
  return { findById, findAll, create, remove, update }

  /**
   * findById
   */
  async function findById(id) {
    return await groups.findById(id)
  }
  /**
   * findAll
   */
  async function findAll() {
    return await groups.findAll()
  }
  /**
   * create
   */
  async function create(data) {
    // control properties validities
    const { error } = Joi.validate(data, Group, {
      abortEarly: false
    })
    if (error) {
      const errorMessage = error.details.map(({ message, context }) =>
        Object.assign({
          message,
          context
        })
      )
      throw new BusinessException(JSON.stringify(errorMessage))
    }
    // create object
    return await groups.create(data)
  }
  /**
   * remove
   */
  async function remove(id) {
    return await groups.remove(id)
  }
  /**
   * update
   */
  async function update(data) {
    // control properties validities
    const { error } = Joi.validate(data, Group, {
      abortEarly: false
    })
    if (error) {
      const errorMessage = error.details.map(({ message, context }) =>
        Object.assign({
          message,
          context
        })
      )
      throw new BusinessException(JSON.stringify(errorMessage))
    }
    // update object
    await groups.update(data)
  }
}
