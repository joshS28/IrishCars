export function formatCurrency(value) {
  const rounded = Math.round(value)
  const abs = Math.abs(rounded)
  const formatted = abs.toLocaleString('en-IE')
  return rounded < 0 ? `-\u20AC${formatted}` : `\u20AC${formatted}`
}

export function formatMonthly(value) {
  const abs = Math.abs(value)
  const formatted = abs.toFixed(0)
  return value < 0 ? `-\u20AC${formatted}` : `\u20AC${formatted}`
}
