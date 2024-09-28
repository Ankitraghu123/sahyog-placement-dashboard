import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faPlus, faRocket, faTasks, faUserShield, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getSingleEmploye } from "../../features/employee/employeeSlice";
import { CounterWidget, SalesValueWidgetPhone } from "../../components/Widgets";
import { AllotedVacansiesByEmployee } from "../../components/Tables";
import TodaysInterview from "../../components/TodaysInterview";

export default () => {
  const dispatch = useDispatch();
  const [pendingVac, setPendingVac] = useState(0);
  const [mail, setMail] = useState(0);
  const [interview, setInterview] = useState(0);
  const [inCompleteVac,setIncompleteVac] = useState(0)

  const currentEmployee = useSelector(state => state.employee?.employee);
  const employee = useSelector(state => state.employee?.singleEmployee);
  const today = new Date().toLocaleDateString('en-GB');

  useEffect(() => {
    if (currentEmployee?._id) {
      console.log("Current Employee ID:", currentEmployee._id);
      dispatch(getSingleEmploye(currentEmployee?._id));
    }
  }, [currentEmployee,dispatch]);

  useEffect(() => {
    if (employee?.allotedVacancies) {
      // Count the number of vacancies with a status of "Pending"
      const pendingCount = employee.allotedVacancies.filter(vac => vac.status === "Pending").length;
      setPendingVac(pendingCount);
      const mailCount = employee.allotedVacancies.filter(vac => vac.mail === "sent").length;
      setMail(mailCount)
      const interviewCount = employee.allotedVacancies.filter(vac => {
        const interviewDate = new Date(vac.interviewSheduled).toLocaleDateString('en-GB');
        return interviewDate === today;
      }).length;
      setInterview(interviewCount)

      const incompleteVacCount = employee.allotedVacancies.filter(vac => 
        vac.status === "Pending" && new Date(vac.deadline).toLocaleDateString() < new Date().toLocaleDateString()
      ).length;
      setIncompleteVac(incompleteVacCount)
    }
  }, [employee]);

  return (
    <>
    {interview > 0 ?
      <div className="mb-5">
        <h1>Todays Interview</h1>
        <TodaysInterview/>
      </div>
    : null}

      <Row className="justify-content-md-center">
        {/* <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col> */}
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Alloted Vacancies"
            title={employee?.allotedVacancies?.length || 0}
            icon={faChartLine}
            to={`/alloted-vacancies/${employee?._id}`}
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Pending Vacancies"
            title={pendingVac - inCompleteVac }
            icon={faCashRegister}
            to={`/pending-vacancies/${employee?._id}`}
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Completed Vacancies"
            title={employee?.allotedVacancies?.length-pendingVac}
            icon={faCashRegister}
            to={`/completed-vacancies/${employee?._id}`}
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Emailed vacancies"
            title={mail}
            icon={faCashRegister}
            to='/mail-sent'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Incomplete vacancies"
            title={inCompleteVac}
            icon={faCashRegister}
            to={`/incomplete-vac/${employee?._id}`}
          />
        </Col>
      </Row>
      <AllotedVacansiesByEmployee pending={true}  vacancyListState={employee?.allotedVacancies}/>
    </>
  );
};
