import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmploye } from '../features/employee/employeeSlice';
import { useParams } from 'react-router-dom';
import {  IncompleteVacanciesTable } from '../components/Tables';
import EmployeeDetail from '../pages/EmployeeDetail';

export default () => {
  const { id } = useParams();
  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(getSingleEmploye(id))
  },[dispatch])
  
  const allEmployees = useSelector((state) => state?.employee?.allEmployees);
  let employeDetail = useSelector((state) => state?.employee?.singleEmployee);

  if (allEmployees) {
    employeDetail = allEmployees[id];
  }

  // Filter the allotedVacancies to include only those with "Pending" status and deadline greater than current date
  const pendingVacancies = employeDetail?.allotedVacancies?.filter(vacancy => {
    const deadlineDate = new Date(vacancy.deadline);
    const currentDate = new Date();
  
    // Set time of both dates to midnight (00:00:00) to ignore the time part
    deadlineDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    return vacancy.status === "Pending" && deadlineDate < currentDate;
  });


  return (
    <>
      <IncompleteVacanciesTable vacancyListState={pendingVacancies} />
    </>
  );
};
