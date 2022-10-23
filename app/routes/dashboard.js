const Joi = require('joi')
const getCustomer = require('./models/customer')
const sbiSchema = require('./schemas/sbi')

module.exports = {
  method: 'GET',
  path: '/dashboard',
  options: {
    validate: {
      query: Joi.object()
        .concat(sbiSchema),
      failAction: async (request, h, error) => {
        return h.redirect('/').takeover()
      }
    },
    handler: async (_, h) => {
      const sbi = h.request.query.sbi
      const customer = await getCustomer(sbi)
      return h.view('dashboard', customer)
    }
  }
}