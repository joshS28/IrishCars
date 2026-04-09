import { useState, useMemo } from 'react'
import { cars } from '../data/cars'
import { getCarExtras, BODY_STYLES } from '../data/carExtras'

// Enrich cars with extras data once
const enrichedCars = cars.map((car) => ({
  ...car,
  ...getCarExtras(car),
}))

const allMakes = [...new Set(enrichedCars.map((c) => c.make))].sort()
const priceMin = Math.min(...enrichedCars.map((c) => c.price_eur))
const priceMax = Math.max(...enrichedCars.map((c) => c.price_eur))
const rateMin = Math.min(...enrichedCars.map((c) => c.interest_rate_pct))
const rateMax = Math.max(...enrichedCars.map((c) => c.interest_rate_pct))
const rangeValues = enrichedCars.filter((c) => c.rangeKm != null).map((c) => c.rangeKm)
const rangeMin = Math.min(...rangeValues)
const rangeMax = Math.max(...rangeValues)

export const FILTER_BOUNDS = {
  priceMin,
  priceMax,
  rateMin,
  rateMax,
  rangeMin,
  rangeMax,
}

const DEFAULT_FILTERS = {
  makes: [],
  types: ['BEV', 'HEV', 'PHEV'],
  bodyStyles: [...BODY_STYLES],
  priceRange: [priceMin, priceMax],
  rateRange: [rateMin, rateMax],
  rangeKmMin: 0,
  sort: 'price-asc',
}

export function useCarFilters(customSortFn) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    let result = enrichedCars.filter((car) => {
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
  }, [filters, customSortFn])

  return { filters, setFilters, filtered, makes: allMakes }
}
