export default function LandingPage({ onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome
      </h2>
      <p className="text-gray-500 mb-10 text-center max-w-md">
        Compare EV and Hybrid car prices and finance options across Ireland
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Browse Car Prices - V2 */}
        <div className="relative bg-white rounded-xl border-2 border-gray-200 p-8 opacity-60 cursor-not-allowed">
          <span className="absolute top-3 right-3 bg-gray-200 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
            Coming in V2
          </span>
          <div className="text-4xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Browse Car Prices</h3>
          <p className="text-sm text-gray-400">
            Compare outright prices, sort and filter by make, model, and type
          </p>
        </div>

        {/* Browse Finance Options - Active */}
        <button
          onClick={() => onNavigate('finance')}
          className="bg-white rounded-xl border-2 border-green-500 p-8 hover:shadow-lg hover:border-green-600 transition-all text-left cursor-pointer group"
        >
          <div className="text-4xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Browse Finance Options</h3>
          <p className="text-sm text-gray-500">
            Explore PCP finance, adjust deposits and monthly payments
          </p>
        </button>

        {/* Car Database - Active */}
        <button
          onClick={() => onNavigate('database')}
          className="bg-white rounded-xl border-2 border-blue-500 p-8 hover:shadow-lg hover:border-blue-600 transition-all text-left cursor-pointer group"
        >
          <div className="text-4xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Car Database</h3>
          <p className="text-sm text-gray-500">
            View and edit car data used in all calculations
          </p>
        </button>
      </div>
    </div>
  )
}
