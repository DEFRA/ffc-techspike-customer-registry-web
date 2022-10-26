const Joi = require('joi')

module.exports = Joi.object({
  schemeName: Joi.string().required().error(errors => {
    errors.forEach(err => { err.message = 'Enter a scheme name' })
    return errors
  })
})