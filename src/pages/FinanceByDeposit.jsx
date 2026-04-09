import { useState, useCallback } from 'react'
import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'
import DepositSlider from '../components/DepositSlider'
import { useCarFilters } from '../hooks/useCarFilters'
import { useCalculatedPayments } from '../hooks/useFinanceCalculations'

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price (Low-High)' },
  { value: 'price-desc', label: 'Price (High-Low)' },
  { value: 'monthly-36-asc', label: 'Monthly 36m (Low-High)' },
  { value: 'monthly-24-asc', label: 'Monthly 24m (Low-High)' },
  { value: 'monthly-48-asc', label: 'Monthly 48m (Low-High)' },
  { value: 'make-asc', label: 'Make (A-Z)' },
  { value: 'range-desc', label: 'Range (High-Low)' },
]

export default function FinanceByDeposit() {
  const [deposit, setDeposit] = useState(10000)

  const customSort = useCallback((cars, sort) => {
    return [...cars].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price_eur - b.price_eur
        case 'price-desc': return b.price_eur - a.price_eur
        case 'make-asc': return a.make.localeCompare(b.make) || a.model.localeCompare(b.model)
        case 'range-desc': return (b.rangeKm || 0) - (a.rangeKm || 0)
        default: return 0
      }
    })
  }, [])

  const { filters, setFilters, filtered, makes } = useCarFilters(customSort)
  const carsWithCalc = useCalculatedPayments(filtered, deposit)

  // Apply monthly-based sorting after calculation
  const sorted = [...carsWithCalc].sort((a, b) => {
    if (filters.sort === 'monthly-36-asc') return a.calculated[36].monthly - b.calculated[36].monthly
    if (filters.sort === 'monthly-24-asc') return a.calculated[24].monthly - b.calculated[24].monthly
    if (filters.sort === 'monthly-48-asc') return a.calculated[48].monthly - b.calculated[48].monthly
    return 0
  })

  const displayCars = filters.sort.startsWith('monthly') ? sorted : carsWithCalc

  return (
    <div>
      <DepositSlider value={deposit} onChange={setDeposit} />
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        makes={makes}
        sortOptions={SORT_OPTIONS}
      />

      <div className="text-sm text-gray-500 mb-4">
        Showing {displayCars.length} cars
      </div>

      {displayCars.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No cars match your filters
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayCars.map((car) => (
            <CarCard
              key={`${car.make}-${car.model}`}
              car={car}
              mode="byDeposit"
              deposit={deposit}
              calculatedData={car.calculated}
            />
          ))}
        </div>
      )}
    </div>
  )
}
