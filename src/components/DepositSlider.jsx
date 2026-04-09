import { formatCurrency } from '../utils/formatters'

export default function DepositSlider({ value, onChange }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Deposit Amount</label>
        <span className="text-lg font-bold text-green-700">{formatCurrency(value)}</span>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={0}
          max={100000}
          step={500}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-sm">&euro;</span>
          <input
            type="number"
            min={0}
            max={100000}
            step={500}
            value={value}
            onChange={(e) => {
              const v = Math.max(0, Math.min(100000, Number(e.target.value) || 0))
              onChange(v)
            }}
            className="w-24 text-sm border border-gray-300 rounded-md px-2 py-1.5 text-right"
          />
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>&euro;0</span>
        <span>&euro;100,000</span>
      </div>
    </div>
  )
}
