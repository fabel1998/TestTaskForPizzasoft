import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddEmployeePage from '../pages/AddEmployeePage';
import EmployeeForm from '../components/EmployeeForm';

// Mock EmployeeForm to isolate AddEmployeePage test
jest.mock('../components/EmployeeForm', () => () => <div data-testid="employee-form"></div>);

describe('AddEmployeePage', () => {
  test('renders AddEmployeePage with title and EmployeeForm', () => {
    render(<AddEmployeePage />);
    
    // Check if the title is rendered
    expect(screen.getByText('Добавить нового сотрудника')).toBeInTheDocument();
    
    // Check if the EmployeeForm is rendered
    expect(screen.getByTestId('employee-form')).toBeInTheDocument();
  });
});