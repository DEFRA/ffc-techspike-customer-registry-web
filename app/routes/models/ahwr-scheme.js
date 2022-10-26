const parseData = (ahwrData) => {
  if (ahwrData) {
    const { reference, claimed, data, createdAt, updatedAt } = JSON.parse(ahwrData)
    return {
      reference,
      whichReview: data?.whichReview,
      offerStatus: data?.offerStatus,
      declaration: data?.declaration,
      claimed,
      createdAt,
      updatedAt
    }
  }

  return {}
}

const buildCustomerSummary = (data) => {
  const rows = [
    { key: { text: 'Reference' }, value: { text: data.reference } },
    { key: { text: 'Which Review' }, value: { text: data.whichReview } },
    { key: { text: 'Declaration' }, value: { text: data.declaration } },
    { key: { text: 'Offer Status' }, value: { text: data.offerStatus } },
    { key: { text: 'Claimed' }, value: { text: data.claimed } },
    { key: { text: 'Created At' }, value: { text: data.createdAt } },
    { key: { text: 'Updated At' }, value: { text: data.updatedAt } }
  ]

  return rows
}

const getAhwrApplication = (ahwrData) => {
  const ahwrApplication = parseData(ahwrData)
  const ahwrApplicationSummary = buildCustomerSummary(ahwrApplication)
  return {
    listData: { rows: ahwrApplicationSummary }
  }
}

module.exports = getAhwrApplication
