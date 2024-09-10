import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Routes } from "../routes"; // Adjust the import path according to your project structure
import { isLoggedIn, isEmployee } from '../config'; // Adjust the import path according to your project structure

// A custom route that checks authentication and role
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isLoggedIn()) {
        // If not logged in, redirect to Signin page
        return <Redirect to={Routes.Signin.path} />;
      } else if (isEmployee() && (rest.path === Routes.DashboardAdmin.path || rest.path === Routes.AddEmployee.path)) {
        // If logged in as employee, restrict access to admin pages
        return <Redirect to={Routes.DashboardOverview.path} />;
      } else {
        // If logged in and authorized, render the component
        return <Component {...props} />;
      }
    }}
  />
);

export default ProtectedRoute;
