import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { AllotedVacansiesByEmployee } from '../components/Tables';
import { AdminTable } from '../Tables';


export default () => {
    
    const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    const today = new Date().toLocaleDateString('en-GB');
    const todayAllotedVac = allVacancies.filter(vacancy => {
        const allotedDate = new Date(vacancy.allotedDate).toLocaleDateString('en-GB');
        return allotedDate ==today;
      })
  return (
   <>
    <AdminTable vacancyListState={todayAllotedVac}/>
   </>
  )
}