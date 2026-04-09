import { useState } from 'react'
import FinanceBrowse from './FinanceBrowse'
import FinanceByDeposit from './FinanceByDeposit'
import FinanceByPayment from './FinanceByPayment'

const TABS = [
  { id: 'browse', label: 'Browse' },
  { id: 'byDeposit', label: 'Choose Deposit' },
  { id: 'byPayment', label: 'Choose Payment' },
]

export default function FinanceSection() {
  const [activeTab, setActiveTab] = useState('browse')

  return (
    <div>
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'browse' && <FinanceBrowse />}
      {activeTab === 'byDeposit' && <FinanceByDeposit />}
      {activeTab === 'byPayment' && <FinanceByPayment />}
    </div>
  )
}
