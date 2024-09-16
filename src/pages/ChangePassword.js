import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
// import { Routes } from "../../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import { useDispatch} from "react-redux";
import { changePassword } from "../features/employee/employeeSlice";
// import { loginEmployee } from "../../features/employee/employeeSlice";

export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const adminData = JSON.parse(localStorage.getItem("admin"));
  const id = adminData._id
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword({id,formData}))

    setTimeout(()=>{
     history.push('/candidate-list')
    },500)
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Change Password</h3>
                </div>
                <Form className="mt-4" onSubmit={formHandler}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={changeHandler}
                        autoFocus
                        required
                        type="text"
                        placeholder="********"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="newPassword" className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={changeHandler}
                        required
                        type="password"
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Form.Group>
                  
                  <Button variant="primary" type="submit" className="w-100">
                    Confirm
                  </Button>
                </Form>



              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
