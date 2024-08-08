import React from 'react';
import EmployeeForm from '../components/EmployeeForm';

const AddEmployeePage = () => {
    return (
      <div className="add-employee-page">
        <h1>Добавить нового сотрудника</h1>
        <EmployeeForm />
      </div>
    );
  };

export default AddEmployeePage