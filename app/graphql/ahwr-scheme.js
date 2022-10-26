const client = require('./client')
const { gql } = require('graphql-request')

const query = gql`
query getCustomer($sbi: Int!, $schemeName: String!) {
  customer(sbi: $sbi) {
    schemes(name: $schemeName) {
      name
      reference
      data
    }
  }
}
`

const getScheme = async (sbi, schemeName) => {
  const response = await client.request(query, { sbi, schemeName })
  const scheme = response?.customer
  return scheme?.schemes[0]
}

module.exports = getScheme