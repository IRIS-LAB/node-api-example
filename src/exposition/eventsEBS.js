export default ({ events }, { getStatusCode }, config, logger, { MissingResourceError }) => {
  return { stream, testStream }

  /**
   * stream
   * @example /smart-api/events?groupId=id&startDateTime=201901011830&endDateTime=201901011830
   */
  async function stream(req, res) {
    const { groupId, startDateTime, endDateTime } = req.query
    try {
      // let request last as long as possible
      req.socket.setTimeout(config.streamTimeout)

      // subscribe to the group events infos
      const subscriber = events.subscribe(groupId, (channel, message) => {
        res.write(message)
      })

      logger.debug(`New subscriber on ${groupId}`)

      //send headers for event-stream connection
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      })

      // on clients close, unsubscribe to the group events info
      req.on('close', () => {
        events.unsubscribe(subscriber)
        logger.debug(`Remove subscriber on ${groupId}`)
      })
    } catch (e) {
      logger.error(`${e.data || e.message} : ${e.stack}`)
      res.status(getStatusCode(e)).send({
        data: e.data || e.message
      })
    }
  }

  async function testStream(req, res) {
    const { groupId, message } = req.body
    events.publish(groupId, message)
    res.status(200).send()
  }
}
