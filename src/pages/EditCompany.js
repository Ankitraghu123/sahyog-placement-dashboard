import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editCompany, getSingleCompany, updateCompany } from '../features/company/companySlice'; // Import the updateCompany action

export default function EditCompanyForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const companyDetails = useSelector(state => state?.company?.singleCompany);

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

  // Fetch the company data when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(getSingleCompany(id));
    }
  }, [dispatch, id]);

  // Populate the form with the company details when they are fetched
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
    }
  }, [companyDetails]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCompany({ id, ...formData })); 
    history.push('/company-list'); 
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Col xs={12} xl={8}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Edit Company</h5>
          <Form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    
                    type="url"
                    name="companyWebsite"
                    placeholder="Enter your company website"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Contact Person Name</Form.Label>
                  <Form.Control
                    
                    type="text"
                    name="contactPersonName"
                    placeholder="Enter contact person's name"
                    value={formData.contactPersonName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Contact Person Mobile</Form.Label>
                  <Form.Control
                    
                    type="tel"
                    name="contactPersonMobile"
                    placeholder="Enter contact person's mobile"
                    value={formData.contactPersonMobile}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Contact Person Email</Form.Label>
                  <Form.Control
                    
                    type="email"
                    name="contactPersonEmail"
                    placeholder="Enter contact person's email"
                    value={formData.contactPersonEmail}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    
                    type="text"
                    name="address"
                    placeholder="Enter your company address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    type="text"
                    name="industry"
                    placeholder="Enter your industry"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" type="submit">Edit Company</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
