import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeList from '../components/EmployeeList';
import { fetchEmployees } from '../features/employees/servicesEmployess';
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const [filterRole, setFilterRole] = React.useState('');
  const [filterArchive, setFilterArchive] = React.useState(false);
  const [sortKey, setSortKey] = React.useState('name');

  const filteredEmployees = employees
    .filter(emp => (filterRole ? emp.role === filterRole : true))
    .filter(emp => (filterArchive ? emp.isArchive : true))
    .sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'birthday') return new Date(a.birthday) - new Date(b.birthday);
      return 0;
    });

  return (
    <div className="home-page">
      <h1>Управление сотрудниками SoftPizza</h1>
      <div className="controls">
        <div className="filter-control">
          <select onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">Все должности</option>
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
        </div>
        <div className="filter-control">
          <input type="checkbox" onChange={(e) => setFilterArchive(e.target.checked)} /> Архив
        </div>
        <div className="filter-control">
          <select onChange={(e) => setSortKey(e.target.value)}>
            <option value="name">Сортировать по имени</option>
            <option value="birthday">Сортировать по дате рождения</option>
          </select>
        </div>
        <Link to="/add" className="add-employee-button">
          <button>Добавить сотрудника</button>
        </Link>
      </div>
      <EmployeeList employees={filteredEmployees} />
    </div>
  );
};

export default HomePage;