export default (logger, exceptions) => {
  return { health }

  async function health(req, res) {
    try {
      res.json({ status: 'UP' })
    } catch (error) {
      logger.error('An error occured', error)
      res.status(500).send('An error occured')
    }
  }
}
