import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCompany } from '../features/company/companySlice';
import { VacancyTableByCompany } from '../components/Tables';
import { createVacancy } from '../features/vacancy/vacancySlice';
import { getAllEmployees } from '../features/employee/employeeSlice';

export default () => {
  const [addVacancy, setAddVacancy] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const companyDetails = useSelector(state => state?.company?.singleCompany);
  const employees = useSelector(state => state?.employee?.allEmployees);

  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    city: '',
    address: '',
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonMobile: '',
    industry: ''
  });

  const [vacancyFormData, setVacancyFormData] = useState({
    companyName: '',
    role: "",
    experienceRequired: "",
    skillsRequired: "",
    ageRequired: "",
    education: "",
    gender: "",
    numberOfJobOpenings: "",
    salary: "",
    jobLocation: "",
    deadline: "",
    jobDescription: "",
    allotedTo:null,
    jobFunction:"",
    city:""
  });

  const handleVacancyChange = (e) => {
    const { name, value } = e.target;
    setVacancyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVacancySubmit = (e) => {
    e.preventDefault();
    dispatch(createVacancy(vacancyFormData));
    setAddVacancy(false);
  };

  // Fetch the company data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getSingleCompany(id));
    }
    dispatch(getAllEmployees())
  }, [dispatch, id]);

  useEffect(() => {
    if (companyDetails) {
      setFormData({
        companyName: companyDetails.companyName || '',
        companyWebsite: companyDetails.companyWebsite || '',
        city: companyDetails.city || '',
        address: companyDetails.address || '',
        contactPersonName: companyDetails.contactPersonName || '',
        contactPersonEmail: companyDetails.contactPersonEmail || '',
        contactPersonMobile: companyDetails.contactPersonMobile || '',
        industry: companyDetails.industry || ''
      });
      // Set the company name in vacancy form data
      setVacancyFormData((prevData) => ({
        ...prevData,
        companyName: companyDetails.companyName || ''
      }));
    }
  }, [companyDetails]);

  return (
    <>
      <Col xs={12} xl={8}>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">Company Details</h5>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      required
                      type="url"
                      name="companyWebsite"
                      placeholder="Enter your company website"
                      value={formData.companyWebsite}
                      onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Contact Person Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="contactPersonName"
                      placeholder="Enter contact person's name"
                      value={formData.contactPersonName}
                      onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Contact Person Mobile</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="contactPersonMobile"
                      placeholder="Enter contact person's mobile"
                      value={formData.contactPersonMobile}
                      onChange={(e) => setFormData({ ...formData, contactPersonMobile: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Contact Person Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="contactPersonEmail"
                      placeholder="Enter contact person's email"
                      value={formData.contactPersonEmail}
                      onChange={(e) => setFormData({ ...formData, contactPersonEmail: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="address"
                      placeholder="Enter your company address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      type="text"
                      name="industry"
                      placeholder="NA"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} className="mb-3">
        <Form.Group>
          <Button variant="primary" onClick={() => setAddVacancy(true)}>
            Add More Vacancy
          </Button>
        </Form.Group>
      </Col>

      {addVacancy && (
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Vacancy Details</h5>
              <Form onSubmit={handleVacancySubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="companyName"
                        placeholder="Enter Company Name"
                        value={vacancyFormData.companyName}
                        // onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Designation</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="role"
                        placeholder="Enter Designation"
                        value={vacancyFormData.role}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Experience</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="experienceRequired"
                        placeholder="Enter Experience"
                        value={vacancyFormData.experienceRequired}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Skills</Form.Label>
                      <Form.Control
                        // required
                        type="text"
                        name="skillsRequired"
                        placeholder="Enter Skills"
                        value={vacancyFormData.skillsRequired}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Age Required</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="ageRequired"
                        placeholder="Enter Age"
                        value={vacancyFormData.ageRequired}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Education</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="education"
                        placeholder="Enter Education"
                        value={vacancyFormData.education}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="gender"
                        placeholder="Enter Gender"
                        value={vacancyFormData.gender}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Number Of Job Openings</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="numberOfJobOpenings"
                        placeholder="Enter Number Of Job Openings"
                        value={vacancyFormData.numberOfJobOpenings}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="salary"
                        placeholder="Enter Salary"
                        value={vacancyFormData.salary}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="jobLocation"
                        placeholder="Enter Location"
                        value={vacancyFormData.jobLocation}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        // required
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={vacancyFormData.city}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Alloted To</Form.Label>
                      <Form.Control
                        as="select"
                        name="allotedTo"
                        value={vacancyFormData.allotedTo}
                        onChange={handleVacancyChange}
                      >
                        <option value={null}>Select Employee</option>
                        {employees.map(employee => (
                          employee.role != 'admin' ? <option key={employee.id} value={employee._id}>
                          {employee.name}
                        </option> : null
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Function</Form.Label>
                      <Form.Control
                        required
                        name="jobFunction"
                        placeholder="Enter Job Function"
                        value={vacancyFormData.jobFunction}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Deadline</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="deadline"
                        placeholder="Enter Deadline"
                        value={vacancyFormData.deadline}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Job Description</Form.Label>
                      <Form.Control
                        
                        as="textarea"
                        rows="4"
                        name="jobDescription"
                        placeholder="Enter Job Description"
                        value={vacancyFormData.jobDescription}
                        onChange={handleVacancyChange}
                      />
                    </Form.Group>
                  </Col>
                 
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )}
      
<VacancyTableByCompany vacancyListState={companyDetails?.jobs}/>
    </>
  )
};


