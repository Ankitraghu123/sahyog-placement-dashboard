import React from 'react';
import { Card, Form, Button, Row, Col } from '@themesberg/react-bootstrap';

export const VacancyForm = () => {
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Vacancy Details</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="serialNumber">
                <Form.Label>S.No</Form.Label>
                <Form.Control required type="text" placeholder="Enter S.No" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Company Name" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control required type="text" placeholder="Enter Designation" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="experience">
                <Form.Label>Experience Required</Form.Label>
                <Form.Control required type="text" placeholder="Enter Experience Required" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="skills">
                <Form.Label>Skill Required</Form.Label>
                <Form.Control required type="text" placeholder="Enter Skills Required" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="noOfPosts">
                <Form.Label>No of Posts</Form.Label>
                <Form.Control required type="text" placeholder="Enter No of Posts" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control required type="text" placeholder="Enter Salary" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="location">
                <Form.Label>Job Location</Form.Label>
                <Form.Control required type="text" placeholder="Enter Job Location" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Submit Vacancy</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
