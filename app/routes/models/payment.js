const parsePayment = (paymentData) => {
  let payment = {}
  if (paymentData) {
    const { applicationReference, data, status, createdAt, updatedAt  } = JSON.parse(paymentData)
    return {
      applicationReference,
      value: data?.value,
      sourceSystem: data?.sourceSystem,
      status,
      createdAt,
      updatedAt
    }
  }

  return payment
}

module.exports = parsePayment