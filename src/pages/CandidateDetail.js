import React, { useEffect, useState } from 'react';
import { CandidateForm } from "../components/Cform";
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleCandidate, applyJob } from '../features/candidate/candidateSlice';
import { JobAppliedBy } from '../components/Tables';
import { getSingleEmploye } from '../features/employee/employeeSlice';

export default () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // State for the selected vacancy
  const [selectedVacancy, setSelectedVacancy] = useState('');

  useEffect(() => {
    dispatch(getSingleCandidate(id));
    dispatch(getSingleEmploye(currEmployee?._id));
  }, [dispatch]);

  const candidateState = useSelector(state => state?.candidate?.singleCandidate);
  const currEmployee = useSelector(state => state?.employee?.employee)
  return (
    <>
    <Col xs={12} xl={12}>
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Candidate Details</h5>
        <Form>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="contactPersonName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" value={candidateState?.name} 
                    placeholder='NA'
/>
              </Form.Group>
            </Col>
          
          
            <Col md={4} className="mb-3">
              <Form.Group id="contactPersonMobile">
                <Form.Label> Mobile</Form.Label>
                <Form.Control required type="tel" value={candidateState?.mobile} 
                    placeholder='NA'
/>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="contactPersonEmail">
                <Form.Label> Email</Form.Label>
                <Form.Control required type="email" value={candidateState?.email} 
                    placeholder='NA'
/>
              </Form.Group>
            </Col>
            </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control value={candidateState?.gender} required>
                 
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="state">
                <Form.Label>State</Form.Label>
                <Form.Control required type="text" value={candidateState?.state} 
                    placeholder='NA'
/>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" value={candidateState?.city} 
                    placeholder='NA'
/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            
            <Col md={4} className="mb-3">
              <Form.Group id="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control required value={candidateState?.dob} type="text" 
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Post Graduation Details</h5>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="postGradApplyYear">
                  <Form.Label>Apply Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="postGradApplyYear"
                    value={candidateState?.postGradApplyYear} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="postGradPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="postGradPassingYear"
                    value={candidateState?.postGradPassingYear} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="postGradPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="postGradPercentage"
                    value={candidateState?.postGradPercentage} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
             
              <Col md={4} className="mb-3">
                <Form.Group id="postGradUniversityName">
                  <Form.Label>University Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="postGradUniversityName"
                    value={candidateState?.postGradUniversityName} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="postGradSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="postGradSubject"
                    value={candidateState?.postGradSubject} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
            <h5 className="mt-4">Graduation Details</h5>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="gradApplyYear">
                  <Form.Label>Apply Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="gradApplyYear"
                    value={candidateState?.gradApplyYear} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="gradPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="gradPassingYear"
                    value={candidateState?.gradPassingYear} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="gradPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="gradPercentage"
                    value={candidateState?.gradPercentage} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
             
              <Col md={4} className="mb-3">
                <Form.Group id="gradUniversityName">
                  <Form.Label>University Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="gradUniversityName"
                    value={candidateState?.gradUniversityName} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group id="gradSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="gradSubject"
                    value={candidateState?.gradSubject} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
          

            <h5 className="mt-4">12th Grade Details</h5>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="twelfthPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twelfthPassingYear"
                    value={candidateState?.twelfthPassingYear} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="twelfthPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twelfthPercentage"
                    value={candidateState?.twelfthPercentage} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="twelfthBoard">
                  <Form.Label>Board</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twelfthBoard"
                    value={candidateState?.twelfthBoard} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              
              <Col md={4} className="mb-3">
                <Form.Group id="twelfthSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twelfthSubject"
                    value={candidateState?.twelfthSubject} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="twelfthSchoolName">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twelfthSchoolName"
                    value={candidateState?.twelfthSchoolName} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
            

            <h5 className="mt-4">10th Grade Details</h5>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="tenthPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="tenthPassingYear"
                    value={candidateState?.tenthPassingYear} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="tenthPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="tenthPercentage"
                    value={candidateState?.tenthPercentage} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="tenthBoard">
                  <Form.Label>Board</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="tenthBoard"
                    value={candidateState?.tenthBoard} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              
              <Col md={4} className="mb-3">
                <Form.Group id="twelfthSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twelfthSubject"
                    value={candidateState?.tenthSubject} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="tenthSchoolName">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="tenthSchoolName"
                    value={candidateState?.tenthSchoolName} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Additional Details</h5>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="twoWheeler">
                  <Form.Label>Two-Wheeler License</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="twoWheeler"
                    value={candidateState?.twoWheeler} 
                  
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="drivingLicense">
                  <Form.Label>Driving License</Form.Label>
                  <Form.Control  
                    type="text" 
                    
                    placeholder='NA'
                    name="drivingLicense"
                    value={candidateState?.drivingLicense} 
                  
                  />
                </Form.Group>
              </Col>
            </Row>
        </Form>
      </Card.Body>
    </Card>
  </Col>

<h1>Applied Jobs</h1>
  <JobAppliedBy id={id}/>
    </>
  )
}