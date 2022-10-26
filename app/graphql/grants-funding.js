const client = require('./client')
const { gql } = require('graphql-request')

const query = gql`
query getCustomer($sbi: Int!) {
  customer(sbi: $sbi) {
    schemes {
      name
      reference
    }
  }
}
`

const getGrantsFunding = async (sbi) => {
  const response = await client.request(query, { sbi })
  const grantsFunding = response?.customer
  return grantsFunding?.schemes
}

module.exports = getGrantsFunding
