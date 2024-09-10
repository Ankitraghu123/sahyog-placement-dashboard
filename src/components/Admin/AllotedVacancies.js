import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { AllotedVacansiesByEmployee } from '../components/Tables';
import { AdminTable } from '../Tables';


export default () => {
    
    const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    const allotedVacancies = allVacancies?.filter(vacancy => vacancy.allotedTo);
  return (
   <>
    <AdminTable vacancyListState={allotedVacancies}/>
   </>
  )
}