/*!
 * Pub/Sub implementation
 * http://addyosmani.com/
 * Licensed under the GPL
 * http://jsfiddle.net/LxPrq/
 */

export default logger => {
  const topics = {},
    pubsub = {}

  let subUid = -1

  pubsub.log = () => {
    logger.info(topics)
  }

  pubsub.publish = (topic, args) => {
    if (!topics[topic]) {
      return false
    }

    setTimeout(() => {
      const subscribers = topics[topic]
      let len = subscribers ? subscribers.length : 0

      while (len--) {
        subscribers[len].func(topic, args)
      }
    }, 0)

    return true
  }

  pubsub.subscribe = (topic, func) => {
    if (!topics[topic]) {
      topics[topic] = []
    }

    const token = (++subUid).toString()
    topics[topic].push({
      token: token,
      func: func
    })
    return token
  }

  pubsub.unsubscribe = token => {
    for (const m in topics) {
      if (topics[m]) {
        for (let i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
    return false
  }
  return pubsub
}
