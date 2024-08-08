import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import { useDispatch } from 'react-redux';
import { fetchEmployees } from './features/employees/servicesEmployess';
import './styles/main.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddEmployeePage />} />
          <Route path="/employee/:id" element={<EditEmployeePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;