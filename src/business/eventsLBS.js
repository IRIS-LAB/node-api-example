import Joi from 'joi'

export default (validators, {}, pubsub, logger, { BusinessException }) => {
  return { subscribe, unsubscribe, publish }

  /**
   * subscribe
   */
  function subscribe(groupId, func) {
    return pubsub.subscribe(groupId, func)
  }
  /**
   * unsubscribe
   */
  function unsubscribe(subscriber) {
    pubsub.unsubscribe(subscriber)
  }

  /**
   * publish a message events
   */
  function publish(groupId, message) {
    pubsub.publish(groupId, message)
  }
}
