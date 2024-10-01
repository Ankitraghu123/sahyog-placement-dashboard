import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IncompleteVacanciesTable } from '../Tables';
import { getSingleEmploye } from '../../features/employee/employeeSlice';

export default () => {
  const { id } = useParams();
  const dispatch= useDispatch()

  const allVac = useSelector(state => state?.vacancy?.allVacancies)

  // Filter the allotedVacancies to include only those with "Pending" status and deadline greater than current date
  const pendingVacancies = allVac?.filter(vacancy => {
    const deadlineDate = new Date(vacancy.deadline);
    const currentDate = new Date();
  
    // Set time of both dates to midnight (00:00:00) to ignore the time part
    deadlineDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    return vacancy.status === "Pending" && deadlineDate < currentDate;
  });


  return (
    <>
      <IncompleteVacanciesTable allvac={true} vacancyListState={pendingVacancies} />
    </>
  );
};
