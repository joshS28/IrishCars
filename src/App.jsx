import { useState, useCallback } from 'react'
import Layout from './components/Layout'
import LandingPage from './components/LandingPage'
import FinanceSection from './pages/FinanceSection'
import CarDatabase from './pages/CarDatabase'
import { cars } from './data/cars'
import { getCarExtras } from './data/carExtras'

// Initialize enriched car data
const initialCars = cars.map((car) => ({
  ...car,
  ...getCarExtras(car),
}))

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [carData, setCarData] = useState(initialCars)

  const updateCar = useCallback((index, field, value) => {
    setCarData((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }, [])

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'landing' && (
        <LandingPage onNavigate={setCurrentPage} />
      )}
      {currentPage === 'finance' && (
        <FinanceSection carData={carData} />
      )}
      {currentPage === 'database' && (
        <CarDatabase carData={carData} updateCar={updateCar} setCarData={setCarData} />
      )}
    </Layout>
  )
}

export default App
