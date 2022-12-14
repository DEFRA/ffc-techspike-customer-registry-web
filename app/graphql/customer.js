const client = require('./client')
const { gql } = require('graphql-request')

const query = gql`
query getCustomer($sbi: Int!) {
  customer(sbi: $sbi) {
    sbi
    firstname
    lastname
    address
    email
    phone
  }
}
`

const getCustomer = async (sbi) => {
  const response = await client.request(query, { sbi })
  const customer = response?.customer
  return customer
}

module.exports = getCustomer
