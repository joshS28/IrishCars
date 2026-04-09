import { useState } from 'react'
import Layout from './components/Layout'
import LandingPage from './components/LandingPage'
import FinanceSection from './pages/FinanceSection'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'landing' && (
        <LandingPage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'finance' && (
        <FinanceSection />
      )}
    </Layout>
  )
}

export default App
