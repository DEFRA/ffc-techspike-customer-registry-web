const client = require('./client')
const { gql } = require('graphql-request')

const query = gql`
query getCustomer($sbi: Int!) {
  customer(sbi: $sbi) {
    payments
  }
}
`

const getPayments = async (sbi) => {
  const response = await client.request(query, { sbi })
  const payment = response?.customer
  return payment.payments
}

module.exports = getPayments

