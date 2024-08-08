import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.scss';

const EmployeeList = ({ employees }) => {
  return (
    <div className="employee-list">
      {employees.map(emp => (
        <Link to={`/employee/${emp.id}`} key={emp.id} className="employee-card-link">
          <div className="employee-card">
            <h3>{emp.name}</h3>
            <p><strong>Должность:</strong> {emp.role}</p>
            <p><strong>Телефон:</strong> {emp.phone}</p>
            <p><strong>День рождения:</strong> {emp.birthday}</p>
            <p><strong>В архиве:</strong> {emp.isArchive ? 'Yes' : 'No'}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EmployeeList;