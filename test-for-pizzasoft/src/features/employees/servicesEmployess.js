import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get('http://localhost:5000/employees');
    return response.data;
});

export const addEmployee = createAsyncThunk('employess/addEmployee', async (employee) => {
    const response = await axios.post('http://localhost:5000/employees', employee);
    return response.data;
})

export const updateEmployee = createAsyncThunk('employess/updateEmployee', async (employee) => {
    const response = await axios.put(`http://localhost:5000/employees/${employee.id}`, employee);
    return response.data;
})
