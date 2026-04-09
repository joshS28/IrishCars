export function calculateGMFV(fullPrice, gmfvPct) {
  return fullPrice * gmfvPct
}

export function calculateMonthlyPayment(netPrice, fullPrice, deposit, termMonths, annualRatePct, gmfvPct) {
  const r = annualRatePct / 100 / 12
  const n = termMonths
  const gmfv = fullPrice * gmfvPct
  const af = netPrice - deposit

  if (r === 0) return (af - gmfv) / n

  const pvFactor = (1 - Math.pow(1 + r, -n)) / r
  const balloonPV = gmfv * Math.pow(1 + r, -n)
  return (af - balloonPV) / pvFactor
}

export function calculateDepositForPayment(netPrice, fullPrice, targetMonthly, termMonths, annualRatePct, gmfvPct) {
  const r = annualRatePct / 100 / 12
  const n = termMonths
  const gmfv = fullPrice * gmfvPct

  if (r === 0) return netPrice - (targetMonthly * n + gmfv)

  const pvFactor = (1 - Math.pow(1 + r, -n)) / r
  const balloonPV = gmfv * Math.pow(1 + r, -n)
  return netPrice - (targetMonthly * pvFactor + balloonPV)
}
