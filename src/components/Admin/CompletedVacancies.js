import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { AllotedVacansiesByEmployee } from '../components/Tables';
import { AdminTable, AllCompletedVacancyTable } from '../Tables';
import AllCompletedVacancies from '../../pages/AllCompletedVacancies';


export default () => {
    
    // const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    // const completedVacancies = allVacancies?.filter(vacancy => vacancy.status === "completed");
  return (
   <>
    {/* <AdminTable vacancyListState={completedVacancies}/> */}
    <AllCompletedVacancyTable/>
   </>
  )
}