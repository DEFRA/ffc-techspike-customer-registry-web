const searchCustomer = require('../graphql/search-customer')

module.exports = [{
  method: 'GET',
  path: '/search-customers',
  options: {
    handler: async (_, h) => {
      return h.view('search-customers', { customers: [], searchString: '', searchField: 'aal' })
    }
  }
},
{
  method: 'POST',
  path: '/search-customers',
  options: {
    handler: async (_, h) => {
      const stringFields = []
      const { searchString, searchField } = h.request.payload

      searchField !== 'all' && stringFields.push(searchField)
      const customers = await searchCustomer(searchString, stringFields)
      return h.view('search-customers', { customers, searchString, searchField })
    }
  }
}]
