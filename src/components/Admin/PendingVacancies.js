import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { AllotedVacansiesByEmployee } from '../components/Tables';
import { AdminTable } from '../Tables';


export default () => {
    
    const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    const pendingVacancies = allVacancies?.filter(vacancy => {
      const deadlineDate = new Date(vacancy.deadline);
      const currentDate = new Date();
    
      // Set time of both dates to midnight (00:00:00) to ignore the time part
      deadlineDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
    
      return vacancy.status === "Pending" && deadlineDate >= currentDate;
    });
  return (
   <>
    <AdminTable vacancyListState={pendingVacancies}/>
   </>
  )
}