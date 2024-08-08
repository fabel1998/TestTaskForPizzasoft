import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddEmployeePage from '../pages/AddEmployeePage';
import EmployeeForm from '../components/EmployeeForm';

jest.mock('../components/EmployeeForm', () => () => <div data-testid="employee-form"></div>);

describe('AddEmployeePage', () => {
  test('renders AddEmployeePage with title and EmployeeForm', () => {
    render(<AddEmployeePage />);
    
    expect(screen.getByText('Добавить нового сотрудника')).toBeInTheDocument();
    
    expect(screen.getByTestId('employee-form')).toBeInTheDocument();
  });
});
