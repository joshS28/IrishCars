import { useState, useCallback } from 'react'
import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'
import { useCarFilters } from '../hooks/useCarFilters'
import { useCalculatedDeposits } from '../hooks/useFinanceCalculations'
import { formatCurrency } from '../utils/formatters'
import { TERMS } from '../data/cars'

const SORT_OPTIONS = [
  { value: 'deposit-asc', label: 'Deposit (Low-High)' },
  { value: 'deposit-desc', label: 'Deposit (High-Low)' },
  { value: 'price-asc', label: 'Price (Low-High)' },
  { value: 'price-desc', label: 'Price (High-Low)' },
  { value: 'make-asc', label: 'Make (A-Z)' },
  { value: 'range-desc', label: 'Range (High-Low)' },
]

export default function FinanceByPayment({ carData }) {
  const [targetMonthly, setTargetMonthly] = useState(400)
  const [selectedTerm, setSelectedTerm] = useState(36)

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

  const { filters, setFilters, filtered, makes, bounds } = useCarFilters(carData, customSort)
  const carsWithCalc = useCalculatedDeposits(filtered, targetMonthly, selectedTerm)

  // Apply deposit-based sorting after calculation
  const sorted = [...carsWithCalc].sort((a, b) => {
    if (filters.sort === 'deposit-asc') return a.calculated.deposit - b.calculated.deposit
    if (filters.sort === 'deposit-desc') return b.calculated.deposit - a.calculated.deposit
    return 0
  })

  const displayCars = filters.sort.startsWith('deposit') ? sorted : carsWithCalc

  return (
    <div>
      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-6">
          {/* Monthly payment input */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Target Monthly Payment
            </label>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm">&euro;</span>
              <input
                type="number"
                min={50}
                max={5000}
                step={25}
                value={targetMonthly}
                onChange={(e) => setTargetMonthly(Math.max(0, Number(e.target.value) || 0))}
                className="w-28 text-sm border border-gray-300 rounded-md px-2 py-1.5 text-right"
              />
              <span className="text-gray-400 text-sm">/month</span>
            </div>
          </div>

          {/* Term selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Term Length
            </label>
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              {TERMS.map((term) => (
                <button
                  key={term}
                  onClick={() => setSelectedTerm(term)}
                  className={`px-4 py-1.5 text-sm font-medium cursor-pointer transition-colors ${
                    selectedTerm === term
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {term}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        makes={makes}
        sortOptions={SORT_OPTIONS}
        bounds={bounds}
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
              mode="byPayment"
              targetMonthly={targetMonthly}
              selectedTerm={selectedTerm}
              calculatedData={car.calculated}
            />
          ))}
        </div>
      )}
    </div>
  )
}
