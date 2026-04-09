import { useState } from 'react'
import { BODY_STYLES } from '../data/carExtras'
import { FILTER_BOUNDS } from '../hooks/useCarFilters'
import { formatCurrency } from '../utils/formatters'

const CAR_TYPES = ['BEV', 'HEV', 'PHEV']

const TYPE_COLORS = {
  BEV: 'bg-green-100 text-green-800 border-green-300',
  HEV: 'bg-blue-100 text-blue-800 border-blue-300',
  PHEV: 'bg-purple-100 text-purple-800 border-purple-300',
}

const TYPE_COLORS_INACTIVE = {
  BEV: 'bg-gray-50 text-gray-400 border-gray-200',
  HEV: 'bg-gray-50 text-gray-400 border-gray-200',
  PHEV: 'bg-gray-50 text-gray-400 border-gray-200',
}

function MultiSelect({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false)
  const allSelected = selected.length === 0
  const displayText = allSelected
    ? `All ${label}`
    : selected.length <= 2
      ? selected.join(', ')
      : `${selected.length} selected`

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white flex items-center gap-2 min-w-[140px] cursor-pointer hover:border-gray-400 transition-colors"
      >
        <span className="truncate">{displayText}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-56 max-h-64 overflow-y-auto">
            <button
              onClick={() => { onChange([]); }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 cursor-pointer ${allSelected ? 'text-green-700 font-medium' : 'text-gray-600'}`}
            >
              All {label}
            </button>
            <div className="border-t border-gray-100 my-1" />
            {options.map((opt) => {
              const isSelected = selected.includes(opt)
              return (
                <button
                  key={opt}
                  onClick={() => {
                    if (isSelected) {
                      onChange(selected.filter((s) => s !== opt))
                    } else {
                      onChange([...selected, opt])
                    }
                  }}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${isSelected ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300'}`}>
                    {isSelected && '✓'}
                  </span>
                  <span className={isSelected ? 'text-gray-800' : 'text-gray-600'}>{opt}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function RangeSlider({ label, min, max, value, onChange, step, formatValue }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <span className="text-xs text-gray-700 font-medium">
          {formatValue(value[0])} - {formatValue(value[1])}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => {
            const v = Number(e.target.value)
            onChange([Math.min(v, value[1]), value[1]])
          }}
          className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => {
            const v = Number(e.target.value)
            onChange([value[0], Math.max(v, value[0])])
          }}
          className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
      </div>
    </div>
  )
}

export default function FilterBar({ filters, onFilterChange, makes, sortOptions }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 p-3 space-y-3">
      {/* Row 1: Brand, Powertrain, Body Style */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium">Brand</label>
          <MultiSelect
            label="Brands"
            options={makes}
            selected={filters.makes}
            onChange={(makes) => onFilterChange({ ...filters, makes })}
          />
        </div>

        <div className="flex items-center gap-1.5">
          {CAR_TYPES.map((type) => {
            const active = filters.types.includes(type)
            return (
              <button
                key={type}
                onClick={() => {
                  const types = active
                    ? filters.types.filter((t) => t !== type)
                    : [...filters.types, type]
                  onFilterChange({ ...filters, types })
                }}
                className={`text-[11px] font-medium px-2 py-1 rounded-full border cursor-pointer transition-colors ${
                  active ? TYPE_COLORS[type] : TYPE_COLORS_INACTIVE[type]
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-1.5">
          {BODY_STYLES.map((style) => {
            const active = filters.bodyStyles.includes(style)
            return (
              <button
                key={style}
                onClick={() => {
                  const bodyStyles = active
                    ? filters.bodyStyles.filter((s) => s !== style)
                    : [...filters.bodyStyles, style]
                  onFilterChange({ ...filters, bodyStyles })
                }}
                className={`text-[11px] font-medium px-2 py-1 rounded-full border cursor-pointer transition-colors ${
                  active
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                {style}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs text-gray-500 font-medium">Sort</label>
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange({ ...filters, sort: e.target.value })}
            className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white"
          >
            {(sortOptions || [
              { value: 'price-asc', label: 'Price (Low-High)' },
              { value: 'price-desc', label: 'Price (High-Low)' },
              { value: 'make-asc', label: 'Make (A-Z)' },
              { value: 'range-desc', label: 'Range (High-Low)' },
            ]).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
        <RangeSlider
          label="Price Range"
          min={FILTER_BOUNDS.priceMin}
          max={FILTER_BOUNDS.priceMax}
          step={1000}
          value={filters.priceRange}
          onChange={(priceRange) => onFilterChange({ ...filters, priceRange })}
          formatValue={formatCurrency}
        />

        <RangeSlider
          label="Interest Rate"
          min={FILTER_BOUNDS.rateMin}
          max={FILTER_BOUNDS.rateMax}
          step={0.1}
          value={filters.rateRange}
          onChange={(rateRange) => onFilterChange({ ...filters, rateRange })}
          formatValue={(v) => `${v.toFixed(1)}%`}
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 font-medium">Min. Electric Range</span>
            <span className="text-xs text-gray-700 font-medium">
              {filters.rangeKmMin > 0 ? `${filters.rangeKmMin}+ km` : 'Any'}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={FILTER_BOUNDS.rangeMax}
            step={25}
            value={filters.rangeKmMin}
            onChange={(e) => onFilterChange({ ...filters, rangeKmMin: Number(e.target.value) })}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
            <span>Any</span>
            <span>{FILTER_BOUNDS.rangeMax} km</span>
          </div>
        </div>
      </div>

      {/* Clear all */}
      <div className="flex justify-end">
        <button
          onClick={() => onFilterChange({
            makes: [],
            types: ['BEV', 'HEV', 'PHEV'],
            bodyStyles: [...BODY_STYLES],
            priceRange: [FILTER_BOUNDS.priceMin, FILTER_BOUNDS.priceMax],
            rateRange: [FILTER_BOUNDS.rateMin, FILTER_BOUNDS.rateMax],
            rangeKmMin: 0,
            sort: filters.sort,
          })}
          className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
        >
          Clear all filters
        </button>
      </div>
    </div>
  )
}
