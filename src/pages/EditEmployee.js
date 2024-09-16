import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Row, Col, Spinner, Alert } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee, getSingleEmploye } from '../features/employee/employeeSlice';
import { useParams, useHistory } from 'react-router-dom';

export default function EmployeeForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch employee data
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                await dispatch(getSingleEmploye(id));
            } catch (err) {
                setError('Failed to load employee data.');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [dispatch, id]);

    // Get employee data from Redux store
    const employeData = useSelector((state) => state.employee.singleEmployee);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        mobile: '',
        city: '',
        gender: '',
    });

    // Update formData when employeData changes
    useEffect(() => {
        if (employeData) {
            setFormData({
                name: employeData.name || '',
                email: employeData.email || '',
                address: employeData.address || '',
                mobile: employeData.mobile || '',
                city: employeData.city || '',
                gender: employeData.gender || '',
            });
        }
    }, [employeData]);

    // Handle form input changes
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const formHandler = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editEmployee({ id, formData }));
            alert('Employee updated successfully!');
            history.push('/employee-list'); // Redirect to employee list or another page
        } catch (err) {
            setError('Failed to update employee.');
        }
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Col xs={12} xl={8}>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">Employee Details</h5>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={formHandler}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="contactPersonName">
                                    <Form.Label>Employee Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={formData.name}
                                        onChange={changeHandler}
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
                                        value={formData.mobile}
                                        onChange={changeHandler}
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
                                        value={formData.email}
                                        onChange={changeHandler}
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
                                        value={formData.gender}
                                        onChange={changeHandler}
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
                                        value={formData.city}
                                        onChange={changeHandler}
                                        // required
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
                                        value={formData.address}
                                        onChange={changeHandler}
                                        // required
                                        type="text"
                                        placeholder="Enter Address"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit">
                                Edit Employee
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
}
