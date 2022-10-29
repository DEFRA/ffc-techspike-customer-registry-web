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
      const customerSearchResults = await searchCustomer(searchString, stringFields)
      const customers = customerSearchResults.map(customer => {
        const schemes = customer?.schemes?.map(scheme => scheme.name.toUpperCase())
        return {
          sbi: customer.sbi,
          name: `${customer.firstname} ${customer.lastname}`,
          address: customer.address,
          email: customer.email,
          phone: customer.phone,
          schemes
        }
      })
      return h.view('search-customers', { customers, searchString, searchField })
    }
  }
}]
