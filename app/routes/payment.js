const Joi = require('joi')
const schemeNameSchema = require('./schemas/scheme-name')
const getPayments = require('../graphql/payment')
const parsePayment = require('./models/payment')

module.exports = {
  method: 'GET',
  path: '/payment',
  options: {
    validate: {
      query: Joi.object({
        sbi: Joi.number().required()
      }),
      failAction: async (request, h, error) => {
        return h.redirect('/').takeover()
      }
    },
    handler: async (_, h) => {
      const sbi = h.request.query.sbi
      const paymentData = await getPayments(sbi)
      const payment = parsePayment(paymentData)
      return h.view('payment', { sbi, payment, backlink: `/dashboard?sbi=${sbi}` })
    }
  }
}