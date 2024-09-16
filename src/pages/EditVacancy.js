import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editVacancy, getSingleVacancies, updateVacancy } from '../features/vacancy/vacancySlice'; // Make sure to import the update action
import { useParams, useHistory } from 'react-router-dom';
import { getAllEmployees } from '../features/employee/employeeSlice';

export default () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    // State to handle form data
    const [formData, setFormData] = useState({
        companyName: "",
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
        allotedTo:"",
        jobFunction:"",
        city:""
    });

    // Fetch the single vacancy details and set the form data
    useEffect(() => {
        dispatch(getSingleVacancies(id));
        dispatch(getAllEmployees())
    }, [dispatch, id]);

    const vacancyDetails = useSelector(state => state.vacancy.singleVacancy);
  const employees = useSelector(state => state?.employee?.allEmployees);

    useEffect(() => {
        if (vacancyDetails) {
            setFormData({
                companyName: vacancyDetails.companyName || "",
                role: vacancyDetails.role || "",
                experienceRequired: vacancyDetails.experienceRequired || "",
                skillsRequired: vacancyDetails.skillsRequired || "",
                ageRequired: vacancyDetails.ageRequired || "",
                education: vacancyDetails.education || "",
                gender: vacancyDetails.gender || "",
                numberOfJobOpenings: vacancyDetails.numberOfJobOpenings || "",
                salary: vacancyDetails.salary || "",
                jobLocation: vacancyDetails.jobLocation || "",
                deadline: vacancyDetails.deadline || "",
                jobDescription: vacancyDetails.jobDescription || "",
                allotedTo: vacancyDetails.allotedTo || null,
                jobFunction: vacancyDetails.jobFunction || "",
                city: vacancyDetails.city || ""
            });
        }
    }, [vacancyDetails]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editVacancy({ id, ...formData }));
        history.push('/vacancy-list'); // Redirect to the desired page after submission
    };

    return (
        <Col xs={12} xl={8}>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">Vacancy Details</h5>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="companyName">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="companyName"
                                        placeholder="Enter Company Name"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="role">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="role"
                                        placeholder="Enter Designation"
                                        value={formData.role}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="experienceRequired">
                                    <Form.Label>Experience Required</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="experienceRequired"
                                        placeholder="Enter Experience Required"
                                        value={formData.experienceRequired}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="skillsRequired">
                                    <Form.Label>Skills Required</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="skillsRequired"
                                        placeholder="Enter Skills Required"
                                        value={formData.skillsRequired}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="ageRequired">
                                    <Form.Label>Age Required</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="ageRequired"
                                        placeholder="Enter Age Required"
                                        value={formData.ageRequired}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="education">
                                    <Form.Label>Education Required</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="education"
                                        placeholder="Enter Required Education"
                                        value={formData.education}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="gender">
                                    <Form.Label>Gender Required</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="gender"
                                        placeholder="Enter Required Gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="numberOfJobOpenings">
                                    <Form.Label>No of Posts</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="numberOfJobOpenings"
                                        placeholder="Enter No of Posts"
                                        value={formData.numberOfJobOpenings}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="salary">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="salary"
                                        placeholder="Enter Salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="jobLocation">
                                    <Form.Label>Job Location</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="jobLocation"
                                        placeholder="Enter Job Location"
                                        value={formData.jobLocation}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="deadline">
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="deadline"
                                        placeholder="Enter Deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">

                                <Form.Group id="jobDescription">
                                    <Form.Label>Job Description</Form.Label>
                                    <Form.Control
                                        
                                        type="text"
                                        name="jobDescription"
                                        placeholder="Enter Job Description"
                                        value={formData.jobDescription}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Alloted To</Form.Label>
                      <Form.Control
                        as="select"
                        name="allotedTo"
                        value={formData.allotedTo}
                        onChange={handleChange}
                        // required
                      >
                        <option value="">Select Employee</option>
                        {employees?.map(employee => (
                          employee.role != 'admin' ? <option key={employee.id} value={employee._id}>
                          {employee.name}
                        </option> : null
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Function</Form.Label>
                      <Form.Control
                        required
                        name="jobFunction"
                        placeholder="Enter Job Function"
                        value={formData.jobFunction}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        // required
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit">Edit Vacancy</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
};
