
const getCustomerData = require('../../graphql/customer')

const formatAddressForDisplay = (address) => {
  return address?.replaceAll(',', '<br>')
}

const buildCustomerSummary = (customer) => {
  const rows = [
    { key: { text: 'First Name' }, value: { text: customer.firstname } },
    { key: { text: 'Last Name' }, value: { text: customer.lastname } },
    {
      key: { text: 'Address' },
      value: { html: formatAddressForDisplay(customer.address) }
    }
  ]

  return rows
}

const getCustomer = async (sbi) => {
  const customer = await getCustomerData(sbi)
  const customerSummary = customer ? buildCustomerSummary(customer) : []
  return {
    customer,
    listData: { rows: customerSummary  }
  }
}

module.exports = getCustomer
