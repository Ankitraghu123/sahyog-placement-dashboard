import React, { useEffect } from 'react'
// import {CandidateForm } from "../components/Cform";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmploye } from '../features/employee/employeeSlice';
import { useParams } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import {  AllotedCompletedVacansiesByEmployee } from './Tables';


export default () => {
    const dispatch = useDispatch()
    const {id} = useParams()

    const allEmployees = useSelector(state => state?.employee?.allEmployees)

    let employeeData = useSelector(state => state?.employee?.singleEmployee)

   

    if(allEmployees){
      employeeData = allEmployees[id]
    }

    const today2 = new Date().toLocaleDateString('en-GB');

    const todayCompletedVac = employeeData.allotedVacancies?.filter(vacancy => {
      const completedDate = new Date(vacancy.completedDate).toLocaleDateString('en-GB');
      return completedDate ==today2;
    })
  return (
   <>
  <AllotedCompletedVacansiesByEmployee vacancyListState={todayCompletedVac}/>
   </>
  )
}