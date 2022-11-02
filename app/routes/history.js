const Joi = require('joi')
const getHistory = require('../graphql/history')

module.exports = {
  method: 'GET',
  path: '/history',
  options: {
    validate: {
      query: Joi.object({
        sbi: Joi.number().required(),
        rowKey: Joi.string().allow(null, '')
      }),
      failAction: async (request, h, error) => {
        return h.redirect('/').takeover()
      }
    },
    handler: async (_, h) => {
      const sbi = h.request.query.sbi
      const rowKey = h.request.query.rowKey
      const history = await getHistory(sbi)
      let historyData = {}
      let historyPayload = {}
      rowKey ? historyPayload = JSON.parse(history.find((x) => x.rowKey === rowKey)?.Payload) : historyPayload = JSON.parse(history[0].Payload)
      const historyType = historyPayload?.type

      if (historyType !== 'create') {
        historyData = { data: historyPayload?.data.orginal, type: historyType }
        console.log(historyData)
      }
      return h.view('history', { sbi, history, historyData, backlink: `/dashboard?sbi=${sbi}` })
    }
  }
}
