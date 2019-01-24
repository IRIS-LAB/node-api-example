import Joi from 'joi'

export default () => {
  return {
    Group: Joi.object().keys({
      id: Joi.optional(),
      code: Joi.required(),
      label: Joi.required(),
      roleAdmin: Joi.required()
    })
  }
}
