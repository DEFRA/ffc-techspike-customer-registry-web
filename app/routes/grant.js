const Joi = require('joi')
const getScheme = require('../graphql/ahwr-scheme')
const getAhwrApplication = require('./models/ahwr-scheme')

module.exports = {
  method: 'GET',
  path: '/grant',
  options: {
    validate: {
      query: Joi.object({
        schemeName: Joi.string().required(),
        sbi: Joi.number().required()
      }),
      failAction: async (request, h, error) => {
        return h.redirect('/').takeover()
      }
    },
    handler: async (_, h) => {
      const sbi = h.request.query.sbi
      const schemeName = h.request.query.schemeName
      const scheme = await getScheme(sbi, schemeName)
      let parseData = null
      if (scheme?.data) {
        if(schemeName === 'AHWR') {
          parseData = getAhwrApplication(scheme.data)
        }
      }
      return h.view('grant', { sbi, schemeName, scheme: parseData, backlink: `/grants-funding?sbi=${sbi}` })
    }
  }
}