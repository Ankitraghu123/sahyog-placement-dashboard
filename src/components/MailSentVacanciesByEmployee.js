import React, { useEffect } from 'react'
// import {CandidateForm } from "../components/Cform";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmploye } from '../features/employee/employeeSlice';
import { useParams } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { AllotedVacansiesByEmployee, MailSentVacanciesByEmployee } from '../components/Tables';


export default () => {
    // const dispatch = useDispatch()
    // const {id} = useParams()
    // useEffect(()=>{
    //     dispatch(getSingleEmploye(id))
    // },[])

    const employeDetail = useSelector(state => state?.employee?.singleEmployee)
  return (
   <>
  <MailSentVacanciesByEmployee vacancyListState={employeDetail?.allotedVacancies}/>
   </>
  )
}