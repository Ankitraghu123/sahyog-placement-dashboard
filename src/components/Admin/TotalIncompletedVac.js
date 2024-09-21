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
  const pendingVacancies = allVac?.filter(vacancy => 
    vacancy.status === "Pending" && new Date(vacancy.deadline).toLocaleDateString() < new Date().toLocaleDateString()
  );


  return (
    <>
      <IncompleteVacanciesTable allvac={true} vacancyListState={pendingVacancies} />
    </>
  );
};
