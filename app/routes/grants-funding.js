const Joi = require('joi')
const getGrantsFunding = require('../graphql/grants-funding')
const sbiSchema = require('./schemas/sbi')

module.exports = {
  method: 'GET',
  path: '/grants-funding',
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
      const grantsFunding = await getGrantsFunding(sbi)
      return h.view('grants-funding', { sbi, grantsFunding, backlink: `/dashboard?sbi=${sbi}` })
    }
  }
}
