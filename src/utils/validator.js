import Joi from 'joi'
import { Base64 } from 'js-base64'
import logger from './logger'

const validatorBody = schema => {
  return async (req, res, next) => {
    const result = Joi.validate(req.body, schema)
    if (result.error !== null) {
      logger.error(result.error)
      res.status(result.error.code || 500).json({ message: result.error.message })
    }
    return next()
  }
}

const validatorQuery = schema => {
  return async (req, res, next) => {
    const result = Joi.validate(req.query, schema)
    if (result.error !== null) {
      logger.error(result.error)
      res.status(result.error.code || 500).json({ message: result.error.message })
    }
    return next()
  }
}
const validatorParams = schema => {
  return async (req, res, next) => {
    const result = Joi.validate(req.params, schema)
    if (result.error !== null) {
      logger.error(result.error)
      res.status(result.error.code || 500).json({ message: result.error.message })
    }
    return next()
  }
}

const validatorQueryObject = schema => {
  return async (req, res, next) => {
    const { object } = req.query
    let queries
    try {
      queries = await Base64.decode(object)
      queries = await JSON.parse(queries)
    } catch (error) {
      return res.badRequest(error)
    }
    const result = Joi.validate(queries, schema)
    if (result.error !== null) {
      return res.badRequest(result.error.message)
    }
    req.queries = queries
    return next()
  }
}

export default {
  validatorBody,
  validatorQuery,
  validatorParams,
  validatorQueryObject,
}
