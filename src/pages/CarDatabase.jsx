import { useState, useMemo } from 'react'
import { formatCurrency } from '../utils/formatters'

const EDITABLE_FIELDS = [
  { key: 'price_eur', label: 'Price (EUR)', type: 'number', step: 100 },
  { key: 'interest_rate_pct', label: 'APR %', type: 'number', step: 0.1 },
  { key: 'rangeKm', label: 'Range (km)', type: 'number', step: 1 },
]

function EditableCell({ value, field, onChange }) {
  const [editing, setEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  if (editing) {
    return (
      <input
        type={field.type}
        step={field.step}
        value={tempValue ?? ''}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={() => {
          setEditing(false)
          const parsed = field.type === 'number' ? Number(tempValue) : tempValue
          if (parsed !== value && !isNaN(parsed)) onChange(parsed)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.target.blur()
          if (e.key === 'Escape') { setTempValue(value); setEditing(false) }
        }}
        className="w-full text-sm border border-blue-400 rounded px-1.5 py-0.5 bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        autoFocus
      />
    )
  }

  const display = field.key === 'price_eur'
    ? formatCurrency(value)
    : field.key === 'interest_rate_pct'
      ? `${value}%`
      : value ?? '-'

  return (
    <span
      onClick={() => { setTempValue(value); setEditing(true) }}
      className="cursor-pointer hover:bg-blue-50 px-1.5 py-0.5 rounded text-sm block transition-colors"
      title="Click to edit"
    >
      {display}
    </span>
  )
}

export default function CarDatabase({ carData, updateCar, setCarData }) {
  const [search, setSearch] = useState('')
  const [filterMake, setFilterMake] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortField, setSortField] = useState('make')
  const [sortDir, setSortDir] = useState('asc')
  const [changedCells, setChangedCells] = useState(new Set())

  const makes = useMemo(() => [...new Set(carData.map((c) => c.make))].sort(), [carData])

  const filtered = useMemo(() => {
    let result = carData.map((car, idx) => ({ ...car, _idx: idx }))

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((c) =>
        `${c.make} ${c.model}`.toLowerCase().includes(q)
      )
    }
    if (filterMake) result = result.filter((c) => c.make === filterMake)
    if (filterType) result = result.filter((c) => c.type === filterType)

    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'make': cmp = a.make.localeCompare(b.make) || a.model.localeCompare(b.model); break
        case 'price_eur': cmp = a.price_eur - b.price_eur; break
        case 'interest_rate_pct': cmp = a.interest_rate_pct - b.interest_rate_pct; break
        case 'rangeKm': cmp = (a.rangeKm || 0) - (b.rangeKm || 0); break
        case 'type': cmp = a.type.localeCompare(b.type); break
        default: cmp = 0
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [carData, search, filterMake, filterType, sortField, sortDir])

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const handleCellChange = (carIdx, field, value) => {
    updateCar(carIdx, field, value)
    setChangedCells((prev) => new Set(prev).add(`${carIdx}-${field}`))
  }

  const handleResetAll = () => {
    // Re-import fresh data
    import('../data/cars').then(({ cars }) => {
      import('../data/carExtras').then(({ getCarExtras }) => {
        const fresh = cars.map((car) => ({ ...car, ...getCarExtras(car) }))
        setCarData(fresh)
        setChangedCells(new Set())
      })
    })
  }

  const sortArrow = (field) => {
    if (sortField !== field) return ''
    return sortDir === 'asc' ? ' \u2191' : ' \u2193'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Car Database</h2>
          <p className="text-xs text-gray-500">
            Click any value to edit. Changes reflect immediately in the finance dashboard.
          </p>
        </div>
        {changedCells.size > 0 && (
          <button
            onClick={handleResetAll}
            className="text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-3 py-1.5 cursor-pointer hover:bg-red-50 transition-colors"
          >
            Reset All Changes ({changedCells.size})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4 bg-white rounded-lg border border-gray-200 p-3">
        <input
          type="text"
          placeholder="Search make or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-64"
        />
        <select
          value={filterMake}
          onChange={(e) => setFilterMake(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1.5"
        >
          <option value="">All Brands</option>
          {makes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1.5"
        >
          <option value="">All Types</option>
          <option value="BEV">BEV</option>
          <option value="HEV">HEV</option>
          <option value="PHEV">PHEV</option>
        </select>
        <span className="text-xs text-gray-400 ml-auto">
          {filtered.length} of {carData.length} cars
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900 select-none" onClick={() => handleSort('make')}>
                Make / Model{sortArrow('make')}
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900 select-none" onClick={() => handleSort('type')}>
                Type{sortArrow('type')}
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-600">
                Body
              </th>
              <th className="text-right py-2 px-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900 select-none" onClick={() => handleSort('price_eur')}>
                Price{sortArrow('price_eur')}
              </th>
              <th className="text-right py-2 px-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900 select-none" onClick={() => handleSort('interest_rate_pct')}>
                APR{sortArrow('interest_rate_pct')}
              </th>
              <th className="text-right py-2 px-3 font-medium text-gray-600 cursor-pointer hover:text-gray-900 select-none" onClick={() => handleSort('rangeKm')}>
                Range{sortArrow('rangeKm')}
              </th>
              <th className="text-center py-2 px-3 font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((car) => {
              const idx = car._idx
              const priceChanged = changedCells.has(`${idx}-price_eur`)
              const rateChanged = changedCells.has(`${idx}-interest_rate_pct`)
              const rangeChanged = changedCells.has(`${idx}-rangeKm`)

              return (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      {car.imageUrl && (
                        <img src={car.imageUrl} alt="" className="w-8 h-5 object-cover rounded shrink-0" loading="lazy" />
                      )}
                      <div>
                        <span className="font-medium text-gray-900">{car.make}</span>
                        <span className="text-gray-500 ml-1">{car.model}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      car.type === 'BEV' ? 'bg-green-100 text-green-800' :
                      car.type === 'HEV' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {car.type}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-500">{car.bodyStyle || '-'}</td>
                  <td className={`py-2 px-3 text-right ${priceChanged ? 'bg-yellow-50' : ''}`}>
                    <EditableCell
                      value={car.price_eur}
                      field={EDITABLE_FIELDS[0]}
                      onChange={(v) => handleCellChange(idx, 'price_eur', v)}
                    />
                  </td>
                  <td className={`py-2 px-3 text-right ${rateChanged ? 'bg-yellow-50' : ''}`}>
                    <EditableCell
                      value={car.interest_rate_pct}
                      field={EDITABLE_FIELDS[1]}
                      onChange={(v) => handleCellChange(idx, 'interest_rate_pct', v)}
                    />
                  </td>
                  <td className={`py-2 px-3 text-right ${rangeChanged ? 'bg-yellow-50' : ''}`}>
                    <EditableCell
                      value={car.rangeKm}
                      field={EDITABLE_FIELDS[2]}
                      onChange={(v) => handleCellChange(idx, 'rangeKm', v)}
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      {car.price_verified === 'estimated' && (
                        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full" title={car.price_note}>
                          Price est.
                        </span>
                      )}
                      {car.rate_verified === 'estimated' && (
                        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full" title={car.rate_note}>
                          Rate est.
                        </span>
                      )}
                      {car.price_verified === 'verified' && car.rate_verified === 'verified' && (
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
