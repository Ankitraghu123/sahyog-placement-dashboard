import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAll } from '../features/contact/contactSlice'
import { EnquiryTable } from '../components/Tables'
// import { AllCompletedVacancyTable } from '../components/Tables'


export default () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAll())
    },[])

   
  return (
   <EnquiryTable/>
  )
}