import React from 'react'
// import {CandidateForm } from "../components/Cform";
import { Col } from '@themesberg/react-bootstrap';
import { EmployeeForm } from '../components/EmployeeForm';

export default () => {
  return (
    <Col xs={12} xl={8}>
   <EmployeeForm/>
  </Col>
  )
}