import CarCard from '../components/CarCard'
import FilterBar from '../components/FilterBar'
import { useCarFilters } from '../hooks/useCarFilters'
import { useCalculatedPayments } from '../hooks/useFinanceCalculations'

export default function FinanceBrowse() {
  const { filters, setFilters, filtered, makes } = useCarFilters()
  const carsWithCalc = useCalculatedPayments(filtered, 10000)

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={setFilters} makes={makes} />

      <div className="text-sm text-gray-500 mb-4">
        Showing {carsWithCalc.length} cars
      </div>

      {carsWithCalc.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No cars match your filters
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {carsWithCalc.map((car) => (
            <CarCard
              key={`${car.make}-${car.model}`}
              car={car}
              mode="byDeposit"
              deposit={10000}
              calculatedData={car.calculated}
            />
          ))}
        </div>
      )}
    </div>
  )
}
