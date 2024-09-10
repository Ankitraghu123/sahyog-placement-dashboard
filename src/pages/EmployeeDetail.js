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
        dispatch(getSingleEmploye(id))
    },[])

    const employeDetail = useSelector(state => state?.employee?.singleEmployee)
  return (
   <>
     <Col xs={12} xl={8}>
     <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Employee Details</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="contactPersonName">
                                <Form.Label>Employee Name</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={employeDetail?.name}
                                    // onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter Employee Name"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="contactPersonMobile">
                                <Form.Label>Employee Mobile</Form.Label>
                                <Form.Control
                                    name="mobile"
                                    value={employeDetail?.mobile}
                                    // onChange={changeHandler}
                                    required
                                    type="tel"
                                    placeholder="Enter Employee Mobile"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group id="contactPersonEmail">
                                <Form.Label>Employee Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={employeDetail?.email}
                                    // onChange={changeHandler}
                                    required
                                    type="email"
                                    placeholder="Enter Employee Email"
                                />
                            </Form.Group>
                        </Col>
                       
                    </Row>
                    <Row>
                    <Col md={6} className="mb-3">
                            <Form.Group id="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    name="gender"
                                    value={employeDetail?.gender}
                                    // onChange={changeHandler}
                                    as="select"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name="city"
                                    value={employeDetail?.city}
                                    // onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter City"
                                />
                            </Form.Group>
                        </Col>
                       
                    </Row>
                    <Row md={6} className="mb-3">
                    <Col md={12} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    name="address"
                                    value={employeDetail?.address}
                                    // onChange={changeHandler}
                                    required
                                    type="text"
                                    placeholder="Enter Address"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Form>
            </Card.Body>
        </Card>
  </Col>

  <AllotedVacansiesByEmployee vacancyListState={employeDetail?.allotedVacancies}/>
   </>
  )
}