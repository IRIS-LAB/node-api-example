import { BusinessException, EntityNotFoundBusinessException, TechnicalException } from 'iris-common'

export default () => {
  return {
    BusinessException,
    EntityNotFoundBusinessException,
    TechnicalException
  }
}
