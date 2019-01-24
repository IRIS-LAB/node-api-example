export default ({ groups }, { getStatusCode }, logger, { MissingResourceError }) => {
  return { findById, findAll, create, remove, update }

  /**
   * findById
   */
  async function findById(req, res) {
    const { id } = req.params
    try {
      const result = await groups.findById(id)
      res.status(200).send(result)
    } catch (e) {
      logger.error(`${e.data || e.message} : ${e.stack}`)
      res.status(getStatusCode(e)).send({
        data: e.data || e.message
      })
    }
  }
  /**
   * findAll
   */
  async function findAll(req, res) {
    try {
      const result = await groups.findAll()
      res.status(200).send(result)
    } catch (e) {
      logger.error(`${e.data || e.message} : ${e.stack}`)
      res.status(getStatusCode(e)).send({
        data: e.data || e.message
      })
    }
  }
  /**
   * create
   */
  async function create(req, res) {
    const { body } = req
    try {
      const id = await groups.create(body)
      res
        .set('Location', `/groups/${id}`)
        .status(201)
        .send()
    } catch (e) {
      logger.error(`${e.data || e.message} : ${e.stack}`)
      res.status(getStatusCode(e)).send({
        data: e.data || e.message
      })
    }
  }
  /**
   * remove
   */
  async function remove(req, res) {
    const { id } = req.params
    try {
      await groups.remove(id)
      res.status(204).send()
    } catch (e) {
      logger.error(`${e.data || e.message} : ${e.stack}`)
      res.status(getStatusCode(e)).send({
        data: e.data || e.message
      })
    }
  }
  /**
   * update
   */
  async function update(req, res) {
    const { id } = req.params
    const { body } = req
    body.id = id
    logger.info(JSON.stringify(body))
    try {
      await groups.update(body)
      res.status(200).send()
    } catch (e) {
      logger.error(`${e.data || e.message} : ${e.stack}`)
      res.status(getStatusCode(e)).send({
        data: e.data || e.message
      })
    }
  }
}
