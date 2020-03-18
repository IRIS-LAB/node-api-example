export default ({ Groups }, logger, { EntityNotFoundBusinessException }) => {
  return { findById, findAll, create, remove, update }

  /**
   * findById
   */
  async function findById(id) {
    const result = await Groups.findByPk(id)
    if (result == null || result == undefined) {
      throw new EntityNotFoundBusinessException()
    }
    return result.toJSON()
  }

  /**
   * findAll
   */
  async function findAll() {
    return await Groups.findAll()
  }
  /**
   * create
   */
  async function create(groupData) {
    const { id } = await Groups.create(groupData)
    return id
  }
  /**
   * remove
   */
  async function remove(id) {
    await Groups.destroy({
      where: {
        id: id
      }
    })
  }
  /**
   * update
   */
  async function update(groupData) {
    await Groups.update(groupData, {
      where: {
        id: groupData.id
      }
    })
  }
}
