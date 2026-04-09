import { describe, it, expect } from 'vitest'
import { calculateMonthlyPayment, calculateDepositForPayment, calculateGMFV } from './pcpCalculations'

describe('calculateGMFV', () => {
  it('calculates GMFV on full price', () => {
    expect(calculateGMFV(31995, 0.55)).toBeCloseTo(17597.25, 2)
  })

  it('calculates GMFV for 36 months', () => {
    expect(calculateGMFV(31995, 0.42)).toBeCloseTo(13437.90, 2)
  })

  it('calculates GMFV for 48 months', () => {
    expect(calculateGMFV(31995, 0.32)).toBeCloseTo(10238.40, 2)
  })
})

describe('calculateMonthlyPayment', () => {
  // Kona Electric: price=31995, rate=2.49%, deposit=10000
  // price_eur already includes SEAI grant, so netPrice = fullPrice = price_eur
  it('calculates Kona Electric 24m correctly', () => {
    const result = calculateMonthlyPayment(31995, 31995, 10000, 24, 2.49, 0.55)
    // AF = 31995 - 10000 = 21995, GMFV = 17597.25
    expect(result).toBeGreaterThan(0)
  })

  it('calculates Kona Electric 36m correctly', () => {
    const result = calculateMonthlyPayment(31995, 31995, 10000, 36, 2.49, 0.42)
    expect(result).toBeGreaterThan(0)
  })

  it('calculates Kona Electric 48m correctly', () => {
    const result = calculateMonthlyPayment(31995, 31995, 10000, 48, 2.49, 0.32)
    expect(result).toBeGreaterThan(0)
  })

  // Inster: price=18995, deposit=10000
  it('calculates Inster 24m correctly', () => {
    const result = calculateMonthlyPayment(18995, 18995, 10000, 24, 2.49, 0.55)
    // AF = 8995, GMFV = 10447.25 -> AF < GMFV so negative monthly
    expect(result).toBeLessThan(0)
  })

  it('handles zero deposit', () => {
    const withDeposit = calculateMonthlyPayment(31995, 31995, 10000, 24, 2.49, 0.55)
    const noDeposit = calculateMonthlyPayment(31995, 31995, 0, 24, 2.49, 0.55)
    expect(noDeposit).toBeGreaterThan(withDeposit)
  })

  it('handles zero interest rate', () => {
    // With 0% rate: (AF - GMFV) / n
    // AF = 31995 - 10000 = 21995, GMFV = 31995 * 0.55 = 17597.25
    // monthly = (21995 - 17597.25) / 24 = 183.24
    expect(calculateMonthlyPayment(31995, 31995, 10000, 24, 0, 0.55)).toBeCloseTo(183.24, 1)
  })
})

describe('calculateDepositForPayment', () => {
  it('inverse of monthly payment calc', () => {
    // Calculate what monthly would be with 10k deposit, then reverse it
    const monthly = calculateMonthlyPayment(31995, 31995, 10000, 36, 2.49, 0.42)
    const deposit = calculateDepositForPayment(31995, 31995, monthly, 36, 2.49, 0.42)
    expect(deposit).toBeCloseTo(10000, 0)
  })

  it('inverse works for 24m term', () => {
    const monthly = calculateMonthlyPayment(31995, 31995, 15000, 24, 2.49, 0.55)
    const deposit = calculateDepositForPayment(31995, 31995, monthly, 24, 2.49, 0.55)
    expect(deposit).toBeCloseTo(15000, 0)
  })

  it('inverse works for 48m term', () => {
    const monthly = calculateMonthlyPayment(31995, 31995, 5000, 48, 2.49, 0.32)
    const deposit = calculateDepositForPayment(31995, 31995, monthly, 48, 2.49, 0.32)
    expect(deposit).toBeCloseTo(5000, 0)
  })

  it('handles zero interest rate', () => {
    const monthly = calculateMonthlyPayment(31995, 31995, 10000, 24, 0, 0.55)
    const deposit = calculateDepositForPayment(31995, 31995, monthly, 24, 0, 0.55)
    expect(deposit).toBeCloseTo(10000, 0)
  })
})
