import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { AllotedVacansiesByEmployee } from '../components/Tables';
import { AdminTable } from '../Tables';


export default () => {
    
    const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    const notEmailedVacancies = allVacancies?.filter(vacancy => vacancy.status === "completed" && vacancy.mail === "sent");
  return (
   <>
    <AdminTable vacancyListState={notEmailedVacancies}/>
   </>
  )
}