import React from 'react'
import { useSelector } from 'react-redux';
import { AdminTable } from '../Tables';

const NotAllotedVacancies = () => {
    const allVacancies = useSelector(state => state.vacancy?.allVacancies)
    const notallotedVacancies = allVacancies?.filter(vacancy => !vacancy.allotedTo);
  return (
   <>
    <AdminTable vacancyListState={notallotedVacancies}/>
   </>
  )
}

export default NotAllotedVacancies