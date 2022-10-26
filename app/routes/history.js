const Joi = require('joi')
const getHistory = require('../graphql/history')
const sbiSchema = require('./schemas/sbi')

module.exports = {
  method: 'GET',
  path: '/history',
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
      const history = await getHistory(sbi)
      return h.view('history', { sbi, history, backlink: `/dashboard?sbi=${sbi}` })
    }
  }
}
