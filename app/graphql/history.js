const client = require('./client')
const { gql } = require('graphql-request')

const query = gql`
query getCustomer($sbi: Int!) {
  customer(sbi: $sbi) {
    history {
      EventRaised
      EventType
      Status
      Payload
    }
  }
}
`

const getHistory = async (sbi) => {
  const response = await client.request(query, { sbi })
  const history = response?.customer
  return history?.history
}

module.exports = getHistory

