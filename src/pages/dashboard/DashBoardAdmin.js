import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row, Table } from '@themesberg/react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { CounterWidget } from "../../components/Widgets";
import { getAllVacancies } from "../../features/vacancy/vacancySlice";
import { getAllEmployees, getSingleEmploye } from "../../features/employee/employeeSlice";
import { Link } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const [interview, setInterview] = useState(0);
 
  const allVacancies = useSelector(state => state.vacancy?.allVacancies);
  const allEmployees = useSelector(state => state.employee?.allEmployees);
  const singleEmployeeData = useSelector(state => state.employee?.singleEmployee);
  const today = new Date().toLocaleDateString('en-GB');

  const [vacancyCounts, setVacancyCounts] = useState({
    alloted: 0,
    notAlloted:0,
    pending: 0,
    completed: 0,
    emailed: 0,
    todayAlloted:0,
    todayCompleted:0,
    totalIncompleted:0,

  });

  const [employeesData, setEmployeesData] = useState({});

  useEffect(() => {
    dispatch(getAllVacancies());
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    if (allVacancies) {
      const allotedCount = allVacancies.filter(vacancy => vacancy.allotedTo).length;
      const notAllotedCount = allVacancies.filter(vacancy => !vacancy.allotedTo).length;
      const pendingCount = allVacancies.filter(vacancy => vacancy.status === "Pending").length;
      const completedCount = allVacancies.filter(vacancy => vacancy.status === "completed").length;
      const emailSent = allVacancies.filter(vacancy => vacancy.status === "completed" && vacancy.mail === "sent").length;

      const interviewCount = allVacancies.filter(vac => {
        const interviewDate = new Date(vac.interviewSheduled).toLocaleDateString('en-GB');
        return interviewDate === today;
      }).length;
      setInterview(interviewCount)

      const todayAllotedCount = allVacancies.filter(vacancy => {
        const allotedDate = new Date(vacancy.allotedDate).toLocaleDateString('en-GB');
        return allotedDate ==today;
      }).length;

      const todayCompletedCount = allVacancies.filter(vacancy => {
        const completedDate = new Date(vacancy.completedDate).toLocaleDateString('en-GB');
        return completedDate ==today;
      }).length;

      const totalIncompleteCount = allVacancies.filter(vac => 
        vac.status === "Pending" && new Date(vac.deadline).toLocaleDateString() < new Date().toLocaleDateString()
      ).length;

      setVacancyCounts({
        alloted: allotedCount,
        notAlloted: notAllotedCount,
        pending: pendingCount,
        completed: completedCount,
        emailed: emailSent,
        todayAlloted:todayAllotedCount,
        todayCompleted:todayCompletedCount,
        totalIncompleted:totalIncompleteCount
      });
    }
  }, [allVacancies]);

  // const fetchEmployeeData = (employeeId) => {
  //   dispatch(getSingleEmploye(employeeId));
  // };

  useEffect(() => {
    if (singleEmployeeData) {
      setEmployeesData(prevData => ({
        ...prevData,
        [singleEmployeeData._id]: singleEmployeeData,
      }));
    }
  }, [singleEmployeeData]);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Alloted"
            title={vacancyCounts.alloted}
            // icon={faChartLine}
            to='/admin/alloted-vacancies'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Not Alloted" // New widget for not allotted vacancies
            title={vacancyCounts.notAlloted}
            // icon={fa}
            to='/admin/not-alloted-vacancies'
          />
        </Col>

        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Pending"
            title={vacancyCounts.pending-vacancyCounts.totalIncompleted}
            // icon={faCashRegister}
            to='/admin/pending-vacancies'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total Completed"
            title={vacancyCounts.completed}
            // icon={faCashRegister}
            to='/admin/completed-vacancies'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Emailed"
            title={vacancyCounts.emailed}
            // icon={faCashRegister}
            to='/admin/emailSent-vacancies'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Todays Interiew"
            title={interview}
            // icon={faCashRegister}
            to='/admin/todays-interview'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Todays Alloted"
            title={vacancyCounts.todayAlloted}
            // icon={faCashRegister}
            to='/admin/today-alloted-vac'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Todays Completed"
            title={vacancyCounts.todayCompleted}
            // icon={faCashRegister}
            to='/admin/today-completed-vacancies'
          />
        </Col>
        <Col xs={6} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Total InCompleted"
            title={vacancyCounts.totalIncompleted}
            // icon={faCashRegister}
            to='/admin/total-incompleted-vacancies'
          />
        </Col>
      </Row>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Employee Name</th>
              <th className="border-bottom">Alloted Vacancy</th>
              <th className="border-bottom">Pendind Vacancy</th>
              <th className="border-bottom">Completed Vacancy</th>
              <th className="border-bottom">Todays Interview</th>
              <th className="border-bottom">InCompleted Vacancy</th>
              <th className="border-bottom">Todays Completed Vacancy</th>
            </tr>
          </thead>
         
          {allEmployees?.map((emp,idx) => {
        if (emp.role !== "admin") {
          // if (!employeesData[emp._id]) {
          //   fetchEmployeeData(emp._id);
          // }
          
          const employeeData =emp;
          const employeePendingVacancies = employeeData.allotedVacancies?.filter(
            vacancy => vacancy.status === "Pending"
          ).length || 0;
          const employeeCompletedVacancies = employeeData.allotedVacancies?.filter(
            vacancy => vacancy.status === "completed"
          ).length || 0;
          const today2 = new Date().toLocaleDateString('en-GB');

          const todayCompletedVac = employeeData.allotedVacancies?.filter(vacancy => {
            const completedDate = new Date(vacancy.completedDate).toLocaleDateString('en-GB');
            return completedDate ==today2;
          }).length || 0


          const today = new Date().toLocaleDateString('en-GB');
          const interviewCount = employeeData.allotedVacancies?.filter(vac => {
            const interviewDate = new Date(vac.interviewSheduled).toLocaleDateString('en-GB');
            return interviewDate === today;
          }).length;

          const incompleteVacCount = employeeData.allotedVacancies.filter(vac => 
            vac.status === "Pending" && new Date(vac.deadline).toLocaleDateString() < new Date().toLocaleDateString()
          ).length;

          return (
            <tbody>
              <tr>
              <td className="border-bottom">{idx}</td>
              <td className="border-bottom">{emp?.name}</td>
            <td className="border-bottom"><Link to={`/alloted-vacancies/${idx}`}>{employeeData.allotedVacancies?.length || 0} </Link></td> 
             <td className="border-bottom"><Link to={`/pending-vacancies/${idx}`}>{employeePendingVacancies-incompleteVacCount}</Link></td>
              <td className="border-bottom"><Link to={`/completed-vacancies/${idx}`}>{employeeCompletedVacancies}</Link></td>
              <td className="border-bottom"><Link to={`/todays-interviews/${idx}`}>{interviewCount}</Link></td>
              <td className="border-bottom"><Link to={`/incomplete-vac/${idx}`}>{incompleteVacCount}</Link></td>
              <td className="border-bottom"><Link to={`/todays-completed-vacancies/${idx}`}>{todayCompletedVac}</Link></td>
              </tr>
              </tbody>
          );
        }
        return null;
      })} 
        </Table>
      
      </Card.Body>
    </Card>
    </>
  );
};
