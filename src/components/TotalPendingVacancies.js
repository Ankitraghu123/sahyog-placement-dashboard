import React, { useEffect } from 'react'
// import {CandidateForm } from "../components/Cform";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmploye } from '../features/employee/employeeSlice';
import { useParams } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { AllotedVacansiesByEmployee } from '../components/Tables';


export default () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
     if(id){
      dispatch(getSingleEmploye(id))
     }
  },[dispatch,id])
   
    const allEmployees = useSelector(state => state?.employee?.allEmployees)
    let employeDetail = useSelector(state => state?.employee?.singleEmployee)
    if(allEmployees){
      employeDetail = allEmployees[id]
    }
  return (
   <>
  <AllotedVacansiesByEmployee pending={true} vacancyListState={employeDetail?.allotedVacancies}/>
   </>
  )
}