import { useState } from 'react'
import { formatCurrency, formatMonthly } from '../utils/formatters'
import { TERMS, GMFV_PERCENTAGES } from '../data/cars'
import { calculateGMFV } from '../utils/pcpCalculations'

const TYPE_COLORS = {
  BEV: 'bg-green-100 text-green-800',
  HEV: 'bg-blue-100 text-blue-800',
  PHEV: 'bg-purple-100 text-purple-800',
}

function FinanceColumn({ label, deposit, monthly, gmfv, isDepositResult }) {
  const depositNegative = deposit < 0
  const monthlyNegative = monthly < 0

  return (
    <div className="text-center flex-1 min-w-0">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="space-y-1">
        <div>
          <span className="text-[10px] text-gray-400 block">
            {isDepositResult ? 'Deposit Needed' : 'Deposit'}
          </span>
          {isDepositResult && depositNegative ? (
            <span className="text-sm font-semibold text-green-600">None needed</span>
          ) : (
            <span className={`text-sm font-semibold ${isDepositResult ? 'text-amber-700' : 'text-gray-700'}`}>
              {formatCurrency(Math.max(0, deposit))}
            </span>
          )}
        </div>
        <div>
          <span className="text-[10px] text-gray-400 block">Monthly</span>
          <span className={`text-sm font-bold ${monthlyNegative ? 'text-green-600' : 'text-blue-700'}`}>
            {formatMonthly(monthly)}/mo
          </span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 block">GMFV</span>
          <span className="text-xs text-gray-500">{formatCurrency(gmfv)}</span>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-xs font-medium ${highlight ? 'text-blue-700 font-bold' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  )
}

function FinanceDetail({ term, carPrice, deposit, monthly, gmfv, interestRate }) {
  const depositActual = Math.max(0, deposit)
  const totalMonthlyPayments = monthly * term
  const totalPayable = depositActual + totalMonthlyPayments + gmfv
  const totalInterest = totalPayable - carPrice

  return (
    <div className="border-t border-gray-100 pt-2">
      <div className="text-xs font-semibold text-gray-600 mb-1">{term} Month PCP</div>
      <DetailRow label="Car Price" value={formatCurrency(carPrice)} />
      <DetailRow label="Deposit" value={formatCurrency(depositActual)} />
      <DetailRow label="GMFV (Balloon)" value={formatCurrency(gmfv)} />
      <DetailRow label="Monthly Payment" value={`${formatMonthly(monthly)}/mo`} highlight />
      <DetailRow label="Number of Months" value={`${term}`} />
      <DetailRow label="Total Monthly Payments" value={formatCurrency(totalMonthlyPayments)} />
      <DetailRow label="Interest Paid" value={formatCurrency(Math.max(0, totalInterest))} />
      <DetailRow label="Total Amount Payable" value={formatCurrency(totalPayable)} highlight />
    </div>
  )
}

export default function CarCard({ car, mode, deposit, calculatedData, targetMonthly, selectedTerm }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight">
            {car.make} {car.model}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs text-gray-400">{car.year}</span>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${TYPE_COLORS[car.type]}`}>
              {car.type}
            </span>
            {car.bodyStyle && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {car.bodyStyle}
              </span>
            )}
            {car.rangeKm && (
              <span className="text-[10px] text-gray-400">{car.rangeKm} km</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{formatCurrency(car.price_eur)}</div>
          <div className="text-[10px] text-gray-400">{car.interest_rate_pct}% APR</div>
        </div>
      </div>

      {/* Finance Section */}
      <div className="border-t border-gray-100 pt-3 mt-auto">
        {mode === 'byDeposit' && calculatedData && (
          <>
            <div className="text-xs text-gray-400 mb-2 text-center">
              Finance based on {formatCurrency(deposit)} deposit
            </div>
            <div className="flex divide-x divide-gray-100">
              {TERMS.map((term) => (
                <FinanceColumn
                  key={term}
                  label={`${term}m`}
                  deposit={deposit}
                  monthly={calculatedData[term].monthly}
                  gmfv={calculatedData[term].gmfv}
                />
              ))}
            </div>
          </>
        )}

        {mode === 'byPayment' && calculatedData && (
          <>
            <div className="text-xs text-gray-400 mb-2 text-center">
              To pay {formatMonthly(targetMonthly)}/mo over {selectedTerm} months
            </div>
            <div className="flex justify-center">
              <FinanceColumn
                label={`${selectedTerm}m`}
                deposit={calculatedData.deposit}
                monthly={targetMonthly}
                gmfv={calculatedData.gmfv}
                isDepositResult
              />
            </div>
          </>
        )}

        {/* Show More / Finance Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-3 text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 cursor-pointer py-1"
        >
          {showDetails ? 'Hide Details' : 'Show More'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {showDetails && (
          <div className="mt-2 space-y-3">
            {mode === 'byDeposit' && calculatedData && (
              TERMS.map((term) => (
                <FinanceDetail
                  key={term}
                  term={term}
                  carPrice={car.price_eur}
                  deposit={deposit}
                  monthly={calculatedData[term].monthly}
                  gmfv={calculatedData[term].gmfv}
                  interestRate={car.interest_rate_pct}
                />
              ))
            )}
            {mode === 'byPayment' && calculatedData && (
              <FinanceDetail
                term={selectedTerm}
                carPrice={car.price_eur}
                deposit={calculatedData.deposit}
                monthly={targetMonthly}
                gmfv={calculatedData.gmfv}
                interestRate={car.interest_rate_pct}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {car.url && (
        <a
          href={car.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-green-600 hover:text-green-700 mt-3 inline-flex items-center gap-1"
        >
          View on {car.make}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      )}
    </div>
  )
}
