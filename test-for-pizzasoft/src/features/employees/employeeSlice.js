import {createSlice} from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee, updateEmployee } from './servicesEmployess';


const initialState = {
    employees: [],
    status: 'idle',
    error: null
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployees.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchEmployees.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employees = action.payload;
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.employees = [...state.employees, action.payload];
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            const index = state.employees.findIndex((employee) => employee.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
              }
        })
    }
});

export default employeeSlice.reducer;



