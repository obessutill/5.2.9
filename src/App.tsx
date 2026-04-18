import { VacanciesPage } from './pages/VacanciesPage'
import { VacancyDetailsPage } from './pages/VacancyDetailsPage';
import { Header } from './components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
    <Header />

    <Routes>
      <Route path="/" element={<Navigate to="/vacancies" replace />}/>
      <Route path="/vacancies" element={<VacanciesPage />}/>
      <Route path="/vacancies/:id" element={<VacancyDetailsPage />}/>
    </Routes>
    </>
  )
}

export default App;