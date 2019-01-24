class MissingResourceError extends Error {
  constructor(data) {
    super()
    this.data = data
  }
}

class ValidationError extends Error {
  constructor(data) {
    super()
    this.data = data
  }
}

export default () => {
  return {
    MissingResourceError,
    ValidationError
  }
}
