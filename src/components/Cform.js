import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { registerCandidate } from '../features/candidate/candidateSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export const CandidateForm = () => {
  const dispatch = useDispatch();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    dob: '',
    gender: '',
    email: '',
    // password: '',
    highestQualification: '',
    postGradApplyYear: '',
    postGradPassingYear: '',
    postGradPercentage: '',
    postGradUniversityName: '',
    postGradSubject: '',
    gradApplyYear: '',
    gradPassingYear: '',
    gradPercentage: '',
    gradUniversityName: '',
    gradSubject: '',
    twelfthApplyYear: '',
    twelfthPassingYear: '',
    twelfthPercentage: '',
    twelfthBoardName: '',
    twelfthSchoolName: '',
    twelfthSubject: '',
    tenthApplyYear: '',
    tenthPassingYear: '',
    tenthPercentage: '',
    tenthBoardName: '',
    tenthSchoolName: '',
    skills: '',
    twoWheeler: '',
    drivingLicense: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerCandidate(formData));
  };

  return (
    <Card className="pt-5 pb-5">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name.."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicMobile">
  <Form.Label>Mobile</Form.Label>
  <Form.Control
    type="text"
    name="mobile"
    placeholder="Enter your number.."
    value={formData.mobile}
    onChange={handleChange}
    maxLength="10" // restricts to 10 digits
    required
  />
  {formData.mobile && formData.mobile.length !== 10 && (
    <Form.Text className="text-danger">
      Mobile number must be exactly 10 digits.
    </Form.Text>
  )}
</Form.Group>


          <Row>
            <Col>
              <Form.Group controlId="formBasicDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="************"
                  value={formData.password}
                  onChange={handleChange}
                  // required
                />
              </Form.Group>
            </Col> */}
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email.."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formBasicHighestQualification">
            <Form.Label>Highest Qualification</Form.Label>
            <Form.Control
              as="select"
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Graduation">Graduation</option>
              <option value="12th">12th</option>
              <option value="10th">10th</option>
            </Form.Control>
          </Form.Group>

          {/* Post Graduation Fields */}
          {formData.highestQualification === "Post Graduation" && (
            <>
              <h3>Post Graduation</h3>
              <Row>
                <Col>
                  <Form.Group controlId="formPostGradApplyYear">
                    <Form.Label>Apply Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="postGradApplyYear"
                      value={formData.postGradApplyYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPostGradPassingYear">
                    <Form.Label>Passing Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="postGradPassingYear"
                      value={formData.postGradPassingYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formPostGradPercentage">
                    <Form.Label>Percentage</Form.Label>
                    <Form.Control
                      type="text"
                      name="postGradPercentage"
                      value={formData.postGradPercentage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formPostGradSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="postGradSubject"
                      value={formData.postGradSubject}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formPostGradUniversityName">
                <Form.Label>University Name</Form.Label>
                <Form.Control
                  type="text"
                  name="postGradUniversityName"
                  value={formData.postGradUniversityName}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {/* Graduation Fields */}
          {(formData.highestQualification === "Post Graduation" || formData.highestQualification === "Graduation") && (
            <>
              <h3>Graduation</h3>
              <Row>
                <Col>
                  <Form.Group controlId="formGradApplyYear">
                    <Form.Label>Apply Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="gradApplyYear"
                      value={formData.gradApplyYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGradPassingYear">
                    <Form.Label>Passing Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="gradPassingYear"
                      value={formData.gradPassingYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formGradPercentage">
                    <Form.Label>Percentage</Form.Label>
                    <Form.Control
                      type="text"
                      name="gradPercentage"
                      value={formData.gradPercentage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGradSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="gradSubject"
                      value={formData.gradSubject}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formGradUniversityName">
                <Form.Label>University Name</Form.Label>
                <Form.Control
                  type="text"
                  name="gradUniversityName"
                  value={formData.gradUniversityName}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {/* 12th Grade Fields */}
          {(formData.highestQualification === "Post Graduation" || formData.highestQualification === "Graduation" || formData.highestQualification === "12th") && (
            <>
              <h3>12th Grade</h3>
              <Row>
                <Col>
                  <Form.Group controlId="formTwelfthApplyYear">
                    <Form.Label>Apply Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="twelfthApplyYear"
                      value={formData.twelfthApplyYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formTwelfthPassingYear">
                    <Form.Label>Passing Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="twelfthPassingYear"
                      value={formData.twelfthPassingYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formTwelfthPercentage">
                    <Form.Label>Percentage</Form.Label>
                    <Form.Control
                      type="text"
                      name="twelfthPercentage"
                      value={formData.twelfthPercentage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formTwelfthBoardName">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="twelfthBoardName"
                      value={formData.twelfthBoardName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group controlId="formTwelfthSchoolName">
                <Form.Label>School Name</Form.Label>
                <Form.Control
                  type="text"
                  name="twelfthSchoolName"
                  value={formData.twelfthSchoolName}
                  onChange={handleChange}
                />
              </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="formTwelfthSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="twelfthSubject"
                  value={formData.twelfthSubject}
                  onChange={handleChange}
                />
              </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {/* 10th Grade Fields */}
          {(formData.highestQualification === "Post Graduation" || formData.highestQualification === "Graduation" || formData.highestQualification === "12th" || formData.highestQualification === "10th") && (
            <>
              <h3>10th Grade</h3>
              <Row>
                <Col>
                  <Form.Group controlId="formTenthApplyYear">
                    <Form.Label>Apply Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="tenthApplyYear"
                      value={formData.tenthApplyYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formTenthPassingYear">
                    <Form.Label>Passing Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="tenthPassingYear"
                      value={formData.tenthPassingYear}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formTenthPercentage">
                    <Form.Label>Percentage</Form.Label>
                    <Form.Control
                      type="text"
                      name="tenthPercentage"
                      value={formData.tenthPercentage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formTenthBoardName">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="tenthBoardName"
                      value={formData.tenthBoardName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Form.Group controlId="formTenthSchoolName">
                <Form.Label>School Name</Form.Label>
                <Form.Control
                  type="text"
                  name="tenthSchoolName"
                  value={formData.tenthSchoolName}
                  onChange={handleChange}
                />
              </Form.Group>
              </Row>
            </>
          )}

          {/* Additional Fields */}
          <Form.Group controlId="formBasicSkills">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              placeholder="Enter your skills.."
              value={formData.skills}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicTwoWheeler">
            <Form.Label>Two Wheeler</Form.Label>
            <Form.Control
              as="select"
              name="twoWheeler"
              value={formData.twoWheeler}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Control>
          </Form.Group>

          <div className="form-group">
            <label>Do you have a driving license?</label>
            <div className="d-flex">
              <label className="d-flex align-items-center mr-5">
                Yes
                <input
                  type="radio"
                  name="drivingLicense"
                  value="yes"
                  checked={formData.drivingLicense === "yes"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      drivingLicense: e.target.value,
                    })
                  }
                  className="ml-4"
                />
              </label>
              <label className="d-flex align-items-center">
                No
                <input
                  type="radio"
                  name="drivingLicense"
                  value="no"
                  checked={formData.drivingLicense === "no"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      drivingLicense: e.target.value,
                    })
                  }
                  className="ml-4"
                />
              </label>
            </div>
          </div>

          <Button variant="primary" type="submit">
            Add Candidate
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
