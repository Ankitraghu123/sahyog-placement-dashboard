import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editCandidate, getSingleCandidate, updateCandidate } from '../features/candidate/candidateSlice';
import { useParams } from 'react-router-dom';

export default () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleCandidate(id));
  }, [dispatch, id]);

  const candidateDetails = useSelector(state => state?.candidate?.singleCandidate);

  const [formData, setFormData] = useState({
    name: candidateDetails?.name || '',
    mobile: candidateDetails?.mobile || '',
    email: candidateDetails?.email || '',
    state: candidateDetails?.state || '',
    city: candidateDetails?.city || '',
    highestQualification: candidateDetails?.highestQualification || '',
    postGradApplyYear: candidateDetails?.postGradApplyYear || '',
    postGradPassingYear: candidateDetails?.postGradPassingYear || '',
    postGradPercentage: candidateDetails?.postGradPercentage || '',
    postGradUniversityName: candidateDetails?.postGradUniversityName || '',
    postGradSubject: candidateDetails?.postGradSubject || '',
    gradApplyYear: candidateDetails?.gradApplyYear || '',
    gradPassingYear: candidateDetails?.gradPassingYear || '',
    gradPercentage: candidateDetails?.gradPercentage || '',
    gradUniversityName: candidateDetails?.gradUniversityName || '',
    gradSubject: candidateDetails?.gradSubject || '',
    twelfthPassingYear: candidateDetails?.twelfthPassingYear || '',
    twelfthPercentage: candidateDetails?.twelfthPercentage || '',
    twelfthBoard: candidateDetails?.twelfthBoard || '',
    twelfthSubject: candidateDetails?.twelfthSubject || '',
    twelfthSchoolName: candidateDetails?.twelfthSchoolName || '',
    tenthPassingYear: candidateDetails?.tenthPassingYear || '',
    tenthPercentage: candidateDetails?.tenthPercentage || '',
    tenthBoard: candidateDetails?.tenthBoard || '',
    tenthSchoolName: candidateDetails?.tenthSchoolName || '',
    twoWheeler: candidateDetails?.twoWheeler || '',
    drivingLicense: candidateDetails?.drivingLicense || '',
  });

  useEffect(() => {
    setFormData({
      name: candidateDetails?.name || '',
      mobile: candidateDetails?.mobile || '',
      email: candidateDetails?.email || '',
      state: candidateDetails?.state || '',
      city: candidateDetails?.city || '',
      highestQualification: candidateDetails?.highestQualification || '',
      postGradApplyYear: candidateDetails?.postGradApplyYear || '',
      postGradPassingYear: candidateDetails?.postGradPassingYear || '',
      postGradPercentage: candidateDetails?.postGradPercentage || '',
      postGradUniversityName: candidateDetails?.postGradUniversityName || '',
      postGradSubject: candidateDetails?.postGradSubject || '',
      gradApplyYear: candidateDetails?.gradApplyYear || '',
      gradPassingYear: candidateDetails?.gradPassingYear || '',
      gradPercentage: candidateDetails?.gradPercentage || '',
      gradUniversityName: candidateDetails?.gradUniversityName || '',
      gradSubject: candidateDetails?.gradSubject || '',
      twelfthPassingYear: candidateDetails?.twelfthPassingYear || '',
      twelfthPercentage: candidateDetails?.twelfthPercentage || '',
      twelfthBoard: candidateDetails?.twelfthBoardName || '',
      twelfthSubject: candidateDetails?.twelfthSubject || '',
      twelfthSchoolName: candidateDetails?.twelfthSchoolName || '',
      tenthPassingYear: candidateDetails?.tenthPassingYear || '',
      tenthPercentage: candidateDetails?.tenthPercentage || '',
      tenthBoard: candidateDetails?.tenthBoardName || '',
      tenthSchoolName: candidateDetails?.tenthSchoolName || '',
      twoWheeler: candidateDetails?.twoWheelerAvailable || '',
      drivingLicense: candidateDetails?.drivingLicense || '',
    });
  }, [candidateDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCandidate({candidateData:formData,id}));
    // Perform any other actions on submit
  };

  return (
    <Col xs={12} xl={8}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Candidate Details</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Name" 
                    name="name"
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control  
                    type="tel" 
                    placeholder="Enter Mobile" 
                    name="mobile"
                    value={formData.mobile} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control  
                    type="email" 
                    placeholder="Enter Email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter State" 
                    name="state"
                    value={formData.state} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter City" 
                    name="city"
                    value={formData.city} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="highestQualification">
                  <Form.Label>Highest Qualification</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Highest Qualification" 
                    name="highestQualification"
                    value={formData.highestQualification} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Post Graduation Details</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="postGradApplyYear">
                  <Form.Label>Apply Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Post Graduation Apply Year" 
                    name="postGradApplyYear"
                    value={formData.postGradApplyYear} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="postGradPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Post Graduation Passing Year" 
                    name="postGradPassingYear"
                    value={formData.postGradPassingYear} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="postGradPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Post Graduation Percentage" 
                    name="postGradPercentage"
                    value={formData.postGradPercentage} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="postGradUniversityName">
                  <Form.Label>University Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Post Graduation University Name" 
                    name="postGradUniversityName"
                    value={formData.postGradUniversityName} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="postGradSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Post Graduation Subject (Course Name)" 
                    name="postGradSubject"
                    value={formData.postGradSubject} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Graduation Details</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="gradApplyYear">
                  <Form.Label>Apply Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Graduation Apply Year" 
                    name="gradApplyYear"
                    value={formData.gradApplyYear} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="gradPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Graduation Passing Year" 
                    name="gradPassingYear"
                    value={formData.gradPassingYear} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="gradPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Graduation Percentage" 
                    name="gradPercentage"
                    value={formData.gradPercentage} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="gradUniversityName">
                  <Form.Label>University Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Graduation University Name" 
                    name="gradUniversityName"
                    value={formData.gradUniversityName} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="gradSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Graduation Subject (Course Name)" 
                    name="gradSubject"
                    value={formData.gradSubject} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">12th Grade Details</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="twelfthPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 12th Grade Passing Year" 
                    name="twelfthPassingYear"
                    value={formData.twelfthPassingYear} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="twelfthPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 12th Grade Percentage" 
                    name="twelfthPercentage"
                    value={formData.twelfthPercentage} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="twelfthBoard">
                  <Form.Label>Board</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 12th Grade Board" 
                    name="twelfthBoard"
                    value={formData.twelfthBoard} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="twelfthSubject">
                  <Form.Label>Subject (Course Name)</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 12th Grade Subject (Course Name)" 
                    name="twelfthSubject"
                    value={formData.twelfthSubject} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group id="twelfthSchoolName">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 12th Grade School Name" 
                    name="twelfthSchoolName"
                    value={formData.twelfthSchoolName} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">10th Grade Details</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="tenthPassingYear">
                  <Form.Label>Passing Year</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 10th Grade Passing Year" 
                    name="tenthPassingYear"
                    value={formData.tenthPassingYear} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="tenthPercentage">
                  <Form.Label>Percentage</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 10th Grade Percentage" 
                    name="tenthPercentage"
                    value={formData.tenthPercentage} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="tenthBoard">
                  <Form.Label>Board</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 10th Grade Board" 
                    name="tenthBoard"
                    value={formData.tenthBoard} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="tenthSchoolName">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter 10th Grade School Name" 
                    name="tenthSchoolName"
                    value={formData.tenthSchoolName} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4">Additional Details</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="twoWheeler">
                  <Form.Label>Two-Wheeler License</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Two-Wheeler License Details" 
                    name="twoWheeler"
                    value={formData.twoWheeler} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="drivingLicense">
                  <Form.Label>Driving License</Form.Label>
                  <Form.Control  
                    type="text" 
                    placeholder="Enter Driving License Details" 
                    name="drivingLicense"
                    value={formData.drivingLicense} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-3">
              <Button variant="primary" type="submit">Edit Candidate Details</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
