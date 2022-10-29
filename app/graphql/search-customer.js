const client = require('./client')
const { gql } = require('graphql-request')

const query = gql`
query searchCustomers($searchString: String!, $searchFields: [String!]) {
  searchCustomers(searchString: $searchString, searchFields: $searchFields) {
    sbi
    firstname
    lastname
    address
    email
    phone
  }
}
`

const searchCustomer = async (searchString, searchFields) => {
  const customers = await client.request(query, { searchString, searchFields })
  return customers?.searchCustomers
}

module.exports = searchCustomer
