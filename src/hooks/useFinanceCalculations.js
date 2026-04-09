import { useMemo } from 'react'
import { calculateMonthlyPayment, calculateDepositForPayment, calculateGMFV } from '../utils/pcpCalculations'
import { GMFV_PERCENTAGES, TERMS } from '../data/cars'

export function useCalculatedPayments(cars, deposit) {
  return useMemo(() =>
    cars.map((car) => ({
      ...car,
      calculated: TERMS.reduce((acc, term) => {
        const gmfvPct = GMFV_PERCENTAGES[term]
        acc[term] = {
          monthly: calculateMonthlyPayment(
            car.price_eur, car.price_eur,
            deposit, term, car.interest_rate_pct, gmfvPct
          ),
          gmfv: calculateGMFV(car.price_eur, gmfvPct),
          deposit,
        }
        return acc
      }, {}),
    })),
    [cars, deposit]
  )
}

export function useCalculatedDeposits(cars, targetMonthly, term) {
  return useMemo(() => {
    const gmfvPct = GMFV_PERCENTAGES[term]
    if (!gmfvPct) return cars

    return cars.map((car) => ({
      ...car,
      calculated: {
        deposit: calculateDepositForPayment(
          car.price_eur, car.price_eur,
          targetMonthly, term, car.interest_rate_pct, gmfvPct
        ),
        gmfv: calculateGMFV(car.price_eur, gmfvPct),
      },
    }))
  }, [cars, targetMonthly, term])
}
