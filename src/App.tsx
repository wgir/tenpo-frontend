import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { OverviewPage } from './pages/OverviewPage'
import { ClientsPage } from './pages/ClientsPage'
import { EmployeesPage } from './pages/EmployeesPage'
import { TransactionsPage } from './pages/TransactionsPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Route>
    </Routes>
  )
}

export default App
