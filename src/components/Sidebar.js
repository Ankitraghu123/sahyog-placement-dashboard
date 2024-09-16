import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faSignOutAlt, faTable,faUsers,faUser, faTimes, faChevronDown, faChevronUp, faBuilding, faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Accordion, Navbar, Form, Row, Col } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Profile3 from "../assets/img/team/profile-pic.png";

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/logo.png";
import { isEmployee, isLoggedIn } from "../utils/config";
import './style.css';
import { useSelector } from "react-redux";
import { FaFontAwesome } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";
  const history = useHistory();

  const onCollapse = () => setShow(!show);
  const employee = useSelector(state => state?.employee?.employee);

  const CollapsableNavItem = ({ eventKey, title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(pathname.indexOf(eventKey) !== -1);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
      <Accordion as={Nav.Item} defaultActiveKey={isOpen ? eventKey : ""}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header as="div" onClick={handleToggle} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
            <span className="sidebar-chevron">
              <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </span>
          </Accordion.Header>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchTerm = form.elements['search'].value.trim();
    if (searchTerm) {
      history.push(`/candidates-by-number?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const loggedOut = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  const NavItem = ({ title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" }) => {
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={Profile3} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, {employee?.name}</h6>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <h3 className="mb-3">Dashboard</h3>
              <Form className="mb-3" inline onSubmit={handleSearch}>
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      name="search"
                      type="text"
                      placeholder="Search By Number"
                      className="mr-sm-2"
                    />
                  </Col>
                  {/* <Col xs="auto">
                    <button type="submit" className="btn btn-primary">Search</button>
                  </Col> */}
                </Row>
              </Form>
              {isEmployee() && <NavItem title="DashBoard" link={Routes.DashboardOverview.path} icon={faChartPie} />}
              {isLoggedIn() && <NavItem title="Admin DashBoard" link={Routes.DashboardAdmin.path} icon={faChartPie} />}
              <CollapsableNavItem eventKey="tables/" title="Candidate" icon={faUsers}>
                <NavItem title="Candidate List" link={Routes.CandidateList.path} />
                <NavItem title="Add Candidate" link={Routes.Candidate.path} />
              </CollapsableNavItem>
              {isLoggedIn() && (
                <>
                  <CollapsableNavItem eventKey="tables/" title="Employee" icon={faUser}>
                    <NavItem title="Employee List" link={Routes.EmployeeList.path} />
                    <NavItem title="Add Employee" link={Routes.AddEmployee.path} />
                  </CollapsableNavItem>
                  <CollapsableNavItem eventKey="tables/" title="Company" icon={faBuilding}>
                    <NavItem title="Company List" link={Routes.CompanyList.path} />
                    <NavItem title="Add Company" link={Routes.Employer.path} />
                  </CollapsableNavItem>
                  <CollapsableNavItem eventKey="tables/" title="Vacancy" icon={faTable}>
                    <NavItem title="Vacancy List" link={Routes.VacancyList.path} />
                  </CollapsableNavItem>
                  <NavItem title="Enquiries" link={Routes.Enquiry.path}  icon={faPhone} />
                </>
              )}
              {isLoggedIn() && <NavItem title="Completed Vacancies" link={Routes.AllCompletedVacancies.path} icon={faChartPie} />}
              {isLoggedIn() && <NavItem title="Change Password" link={Routes.ChangePassword.path} icon={faLock} />}
              <button className="mt-3 btn1" onClick={loggedOut}>Log Out</button>
              {/* <NavItem title="Sign In" link={Routes.Signin.path} /> */}
              {/* <Dropdown.Divider className="my-3 border-indigo" /> */}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
