import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import Vacancy from "./VacancyForm";
import Candidate from "./CandidateForm";
import Employer from "./EmployerRegistrationForm";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import CandidateList from './CandidateList';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import CompanyList from './CompanyList';
import VacancyList from './VacancyList';
import EditCandidate from './EditCandidate';
import EditEmployee from './EditEmployee';
import EditCompany from './EditCompany';
import EditVacancy from './EditVacancy';
import CompanyDetail from './CompanyDetail';
import CandidateDetail from './CandidateDetail';
import EmployeeDetail from './EmployeeDetail';
import TotalAllotedVacancies from '../components/TotalAllotedVacancies';
import TotalPendingVacancies from '../components/TotalPendingVacancies';
import CandidatesShortListedByJob from './CandidatesShortListedByJob';
import AllCompletedVacancies from './AllCompletedVacancies';
import MailSentVacanciesByEmployee from '../components/MailSentVacanciesByEmployee';
import DashBoardAdmin from './dashboard/DashBoardAdmin';
import CandidateTableByNumber from '../components/CandidateTableByNumber';
import SouthTracker from './SouthTracker';
// import Forms from "./components/Forms";

// Import the authentication functions
import { isLoggedIn, isEmployee } from '../utils/config'; // Adjust the import path accordingly
import WestTracker from './WestTracker';
import CentralTracker from './CentralTracker';
import TotalAllotedCompletedVacancy from '../components/TotalAllotedCompletedVacancy';
import Enquiry from './Enquiry';
import AllotedVacancies from '../components/Admin/AllotedVacancies';
import CompletedVacancies from '../components/Admin/CompletedVacancies';
import PendingVacancies from '../components/Admin/PendingVacancies';
import NotEmailedVacancy from '../components/Admin/NotEmailedVacancy';
import TodaysInterview from '../components/TodaysInterview';
import NorthTracker from './NorthTracker';
import EastTracker from './EastTracker';
import ChangePassword from './ChangePassword';
import NotAllotedVacancies from '../components/Admin/NotAllotedVacancies';
import TodayTotalInterviews from '../components/Admin/TodayTotalInterviews'
import TodaysAllotedVacancy from '../components/Admin/TodaysAllotedVacancy'
import TodaysCompletedVac from '../components/Admin/TodaysCompletedVac'
import TodaysCompletedEmpVac from '../components/TodayCompletedEmpVac'
import IncompleteAllotedVac from '../components/IncompleteAllotedVac';
import TotalIncompletedVac from '../components/Admin/TotalIncompletedVac';


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderComponent = (props) => {
    if (rest.path === Routes.Signin.path) {
      if (isLoggedIn() || isEmployee()) {
        // Redirect based on user role
        return isEmployee() ? <Redirect to={Routes.DashboardOverview.path} /> : <Redirect to={Routes.DashboardAdmin.path} />;
      }
    }
    return (
      <>
        <Preloader show={loaded ? false : true} />
        <Component {...props} />
      </>
    );
  };

  return <Route {...rest} render={renderComponent} />;
};

const RouteWithSidebar = ({ component: Component, condition, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={props => (
        condition ? (
          <>
            <Preloader show={loaded ? false : true} />
            <Sidebar />
            <main className="content">
              <Navbar />
              <Component {...props} />
              {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
            </main>
          </>
        ) : (
          <Redirect to={Routes.Signin.path} />
        )
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} condition={isEmployee()} />
    <RouteWithSidebar exact path={Routes.DashboardAdmin.path} component={DashBoardAdmin} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.TodayAllotedVac.path} component={TodaysAllotedVacancy} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.TodayCompletedVac.path} component={TodaysCompletedVac} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.TotalIncompletedVac.path} component={TotalIncompletedVac} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.AllotedVacancies.path} component={AllotedVacancies} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.NotAllotedVacancies.path} component={NotAllotedVacancies} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.TodaysTotalInterview.path} component={TodayTotalInterviews} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.AdminCompleted.path} component={CompletedVacancies} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.AdminPending.path} component={PendingVacancies} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.AdminEmailNotSent.path} component={NotEmailedVacancy} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.Vacancy.path} component={Vacancy} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.TotalAllotedVacancies.path} component={TotalAllotedVacancies} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.TotalPendingVacancies.path} component={TotalPendingVacancies} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.TodaysInterview.path} component={TodaysInterview} condition={isLoggedIn() || isEmployee()} />



    <RouteWithSidebar exact path={Routes.TotalAllotedCompletedVacancies.path} component={TotalAllotedCompletedVacancy} condition={isLoggedIn() || isEmployee()} />

    <RouteWithSidebar exact path={Routes.TodayCompletedEmpVac.path} component={TodaysCompletedEmpVac} condition={isLoggedIn() || isEmployee()} />

    <RouteWithSidebar exact path={Routes.IncompleteAllotedVac.path} component={IncompleteAllotedVac} condition={isLoggedIn() || isEmployee()} />

    <RouteWithSidebar exact path={Routes.AllCompletedVacancies.path} component={AllCompletedVacancies} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.Enquiry.path} component={Enquiry} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.ChangePassword.path} component={ChangePassword} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.MailSentVacanciesByEmployee.path} component={MailSentVacanciesByEmployee} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.Employer.path} component={Employer} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.Candidate.path} component={Candidate} condition={isLoggedIn() || isEmployee()} />
    
    {/* Routes for Employees */}
    <RouteWithSidebar exact path={Routes.CandidateList.path} component={CandidateList} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.AddEmployee.path} component={AddEmployee} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.CandidateByNumber.path} component={CandidateTableByNumber} condition={isLoggedIn() || isEmployee()} />
    
    <RouteWithSidebar exact path={Routes.SouthTracker.path} component={SouthTracker} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.WestTracker.path} component={WestTracker} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.CentralTracker.path} component={CentralTracker} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.NorthTracker.path} component={NorthTracker} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.EastTracker.path} component={EastTracker} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.EditCandidate.path} component={EditCandidate} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.CandidateDetail.path} component={CandidateDetail} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.CandidateShortListedByJob.path} component={CandidatesShortListedByJob} condition={isLoggedIn() || isEmployee()} />
    <RouteWithSidebar exact path={Routes.EmployeeList.path} component={EmployeeList} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.EditEmployee.path} component={EditEmployee} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.EmployeeDetail.path} component={EmployeeDetail} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.VacancyList.path} component={VacancyList} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.EditVacancy.path} component={EditVacancy} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.CompanyList.path} component={CompanyList} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.EditCompany.path} component={EditCompany} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.CompanyDetail.path} component={CompanyDetail} condition={isLoggedIn()} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} condition={isLoggedIn()} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
