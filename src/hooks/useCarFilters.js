import { useState, useMemo } from 'react'
import { BODY_STYLES } from '../data/carExtras'

export function getFilterBounds(cars) {
  const priceMin = Math.min(...cars.map((c) => c.price_eur))
  const priceMax = Math.max(...cars.map((c) => c.price_eur))
  const rateMin = Math.min(...cars.map((c) => c.interest_rate_pct))
  const rateMax = Math.max(...cars.map((c) => c.interest_rate_pct))
  const rangeValues = cars.filter((c) => c.rangeKm != null).map((c) => c.rangeKm)
  const rangeMin = rangeValues.length ? Math.min(...rangeValues) : 0
  const rangeMax = rangeValues.length ? Math.max(...rangeValues) : 1000
  return { priceMin, priceMax, rateMin, rateMax, rangeMin, rangeMax }
}

// Keep a static FILTER_BOUNDS for backward compat (will be overridden by dynamic)
export const FILTER_BOUNDS = { priceMin: 0, priceMax: 250000, rateMin: 0, rateMax: 10, rangeMin: 0, rangeMax: 1000 }

const DEFAULT_FILTERS = {
  makes: [],
  types: ['BEV', 'HEV', 'PHEV'],
  bodyStyles: [...BODY_STYLES],
  priceRange: [0, 250000],
  rateRange: [0, 10],
  rangeKmMin: 0,
  sort: 'price-asc',
}

export function useCarFilters(carsInput, customSortFn) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const makes = useMemo(
    () => [...new Set(carsInput.map((c) => c.make))].sort(),
    [carsInput]
  )

  const bounds = useMemo(() => getFilterBounds(carsInput), [carsInput])

  const filtered = useMemo(() => {
    let result = carsInput.filter((car) => {
      if (filters.makes.length > 0 && !filters.makes.includes(car.make)) return false
      if (!filters.types.includes(car.type)) return false
      if (!filters.bodyStyles.includes(car.bodyStyle)) return false
      if (car.price_eur < filters.priceRange[0] || car.price_eur > filters.priceRange[1]) return false
      if (car.interest_rate_pct < filters.rateRange[0] || car.interest_rate_pct > filters.rateRange[1]) return false
      if (filters.rangeKmMin > 0) {
        if (car.rangeKm == null || car.rangeKm < filters.rangeKmMin) return false
      }
      return true
    })

    if (customSortFn) {
      result = customSortFn(result, filters.sort)
    } else {
      result = [...result].sort((a, b) => {
        switch (filters.sort) {
          case 'price-asc': return a.price_eur - b.price_eur
          case 'price-desc': return b.price_eur - a.price_eur
          case 'make-asc': return a.make.localeCompare(b.make) || a.model.localeCompare(b.model)
          case 'range-desc': return (b.rangeKm || 0) - (a.rangeKm || 0)
          default: return 0
        }
      })
    }

    return result
  }, [carsInput, filters, customSortFn])

  return { filters, setFilters, filtered, makes, bounds }
}
