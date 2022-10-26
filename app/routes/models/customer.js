
const getCustomerData = require('../../graphql/customer')

const formatAddressForDisplay = (address) => {
  return address?.replaceAll(',', '<br>')
}

const buildCustomerSummary = (customer) => {
  const rows = [
    { key: { text: 'SBI' }, value: { text: customer.sbi } },
    { key: { text: 'First Name' }, value: { text: customer.firstname } },
    { key: { text: 'Last Name' }, value: { text: customer.lastname } },
    {
      key: { text: 'Address' },
      value: { html: formatAddressForDisplay(customer.address) }
    },
    { key: { text: 'Email' }, value: { text: customer.email } },
    { key: { text: 'Phone' }, value: { text: customer.phone } },
  ]

  return rows
}

const getCustomer = async (sbi) => {
  const customer = await getCustomerData(sbi)
  const customerSummary = customer ? buildCustomerSummary(customer) : []
  return {
    sbi,
    customer,
    listData: { rows: customerSummary }
  }
}

module.exports = getCustomer
