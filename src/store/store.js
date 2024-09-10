import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../features/candidate/candidateSlice';
import employeeReducer from '../features/employee/employeeSlice';
import companyReducer from '../features/company/companySlice';
import vacancyReducer from '../features/vacancy/vacancySlice';
import contactReducer from '../features/contact/contactSlice';


export const store = configureStore({
  reducer: {
   candidate:candidateReducer,
   employee: employeeReducer,
   company:companyReducer,
   vacancy:vacancyReducer,
   contact:contactReducer
  }
});
