export default ({ groups }, logger, { MissingResourceError }) => {
  return { findById, findAll, create, remove, update }

  /**
   * findById
   */
  async function findById(req, res, next) {
    const { id } = req.params
    try {
      const result = await groups.findById(id)
      res.status(200).send(result)
    } catch (err) {
      return next(err)
    }
  }
  /**
   * findAll
   */
  async function findAll(req, res, next) {
    try {
      const result = await groups.findAll()
      res.status(200).send(result)
    } catch (err) {
      return next(err)
    }
  }
  /**
   * create
   */
  async function create(req, res, next) {
    const { body } = req
    try {
      const id = await groups.create(body)
      res
        .set('Location', `/groups/${id}`)
        .status(201)
        .send()
    } catch (err) {
      return next(err)
    }
  }
  /**
   * remove
   */
  async function remove(req, res, next) {
    const { id } = req.params
    try {
      await groups.remove(id)
      res.status(204).send()
    } catch (err) {
      return next(err)
    }
  }
  /**
   * update
   */
  async function update(req, res, next) {
    const { id } = req.params
    const { body } = req
    body.id = id
    logger.info(JSON.stringify(body))
    try {
      await groups.update(body)
      res.status(200).send()
    } catch (err) {
      return next(err)
    }
  }
}
