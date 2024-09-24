
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button,Form, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { applyJob, candidateList, deleteCandidate, editCandidate, jobsAppliedByCandidate } from '../features/candidate/candidateSlice'

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { deleteEmployee, getAllEmployees, getSingleEmploye, loginEmployee } from "../features/employee/employeeSlice";
import { deleteCompany, getAllCompanies } from "../features/company/companySlice";
import { deleteVacancy, editVacancy, getAllVacancies } from "../features/vacancy/vacancySlice";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const CandidateTable = () => {
  const dispatch = useDispatch();
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [statusFilter, setStatusFilter] = useState(''); // State for status filter
  const [cityFilter, setCityFilter] = useState(''); // State for city filter
  const [qualificationFilter, setQualificationFilter] = useState(''); // State for highest qualification filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default number of items per page

  const currentEmployee = useSelector(state => state.employee?.employee);
  
  useEffect(() => {
    if (currentEmployee?._id) {
      dispatch(getSingleEmploye(currentEmployee._id));
    }
    dispatch(candidateList());
  }, [dispatch, currentEmployee]);

  const candidateListState = useSelector(state => state?.candidate?.candidatelist || []);
  const vacancyListState = useSelector(state => state?.employee?.singleEmployee?.allotedVacancies);

  const deleteHandler = (id) => {
    dispatch(deleteCandidate(id));
  };

  const handleCheckboxChange = (candidateId) => {
    setSelectedCandidates(prevSelected =>
      prevSelected.includes(candidateId)
        ? prevSelected.filter(id => id !== candidateId)
        : [...prevSelected, candidateId]
    );
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedCandidates(candidateListState.map(candidate => candidate._id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleVacancyChange = (e) => {
    setSelectedVacancy(e.target.value);
  };

  const handleApply = () => {
    if (selectedCandidates.length > 0 && selectedVacancy) {
      dispatch(applyJob({ selectedCandidates, selectedVacancy }));
    }
  };

  // Filter candidates based on search input, status, city, and highest qualification
  const filteredCandidates = candidateListState?.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || candidate.status === statusFilter) &&
    (cityFilter === '' || candidate.city?.toLowerCase().includes(cityFilter.toLowerCase())) &&
    (qualificationFilter === '' || candidate.highestQualification.toLowerCase().startsWith(qualificationFilter.toLowerCase()))
  );

  // Get current candidates based on pagination
  const indexOfLastCandidate = currentPage * itemsPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - itemsPerPage;
  const currentCandidates = filteredCandidates?.slice(indexOfFirstCandidate, indexOfLastCandidate);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCandidates?.length / itemsPerPage);

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  return (
    <>
      {/* Search Input and Filters */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Control
          type="text"
          placeholder="Search by candidate name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '22%' }}
        />
        <Form.Control
          as="select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: '22%' }}
        >
          <option value="">Filter by status</option>
          <option value="Pending">Pending</option>
          <option value="shortlisted">ShortListed</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </Form.Control>
        <Form.Control
          type="text"
          placeholder="Search by city..."
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{ width: '22%' }}
        />
        <Form.Control
          type="text"
          placeholder="Search by highest qualification..."
          value={qualificationFilter}
          onChange={(e) => setQualificationFilter(e.target.value)}
          style={{ width: '22%' }}
        />
      </div>
      <Form.Group controlId="itemsPerPageSelect" className="mt-3 d-flex align-items-center mb-2">
              <Form.Label>Show entries:</Form.Label>
              <Form.Control
                as="select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{ width: '120px', marginLeft: '10px' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Control>
            </Form.Group>

      {/* Table with Candidates */}
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">
                  {/* <Form.Check type="checkbox" onChange={handleSelectAllChange} /> */}
                </th>
                <th className="border-bottom">S.NO</th>
                <th className="border-bottom">Candidate Name</th>
                <th className="border-bottom">Mobile</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">City</th>
                <th className="border-bottom">Qualification</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates?.map((candidate, idx) => (
                <tr key={candidate._id}>
                  <td className="border-bottom">
                    <Form.Check
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate._id)}
                      onChange={() => handleCheckboxChange(candidate._id)}
                    />
                  </td>
                  <td className="border-bottom">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="border-bottom">
                    <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link>
                  </td>
                  <td className="border-bottom">{candidate.mobile}</td>
                  <td className="border-bottom">{candidate.status}</td>
                  <td className="border-bottom">{candidate.city}</td>
                  <td className="border-bottom">{candidate.highestQualification}</td>
                  <td className="border-bottom cursor-pointer">
                    <FontAwesomeIcon onClick={() => deleteHandler(candidate._id)} icon={faTrashAlt} />
                    <Link className="ms-2" to={`/edit-candidate/${candidate._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination and Items per Page Dropdown */}
          <div className="d-flex justify-content-between align-items-center">
            <Pagination className="mt-3">
              {[...Array(totalPages).keys()]?.map(pageNumber => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              ))}
            </Pagination>

            {/* Items per page selection */}
          </div>
        </Card.Body>
      </Card>

      {/* Select Vacancy and Apply Button */}
      <div className="mt-3">
        <Form.Group controlId="selectVacancy text-black">
          <Form.Label>Select Vacancy</Form.Label>
          <Form.Control as="select" value={selectedVacancy} onChange={handleVacancyChange}>
            <option value="">Select a vacancy</option>
            {vacancyListState?.map(vacancy => (
  vacancy.status === 'Pending' ? (
    <option key={vacancy._id} value={vacancy._id}>
      {vacancy.role}-{vacancy.companyName}-{vacancy.jobLocation}
    </option>
  ) : null
))}

          </Form.Control>
        </Form.Group>
        <Button className="mt-2" onClick={handleApply} disabled={selectedCandidates.length === 0 || !selectedVacancy}>
          Apply
        </Button>
      </div>
    </>
  );
};

// export const CandidateTable = () => {
//   const dispatch = useDispatch();
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [selectedVacancy, setSelectedVacancy] = useState('');
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const [statusFilter, setStatusFilter] = useState(''); // State for status filter
//   const [cityFilter, setCityFilter] = useState(''); // State for city filter
//   const [qualificationFilter, setQualificationFilter] = useState(''); // State for highest qualification filter

//   const currentEmployee = useSelector(state => state.employee?.employee);
//   useEffect(() => {
//     if (currentEmployee?._id) {
//       dispatch(getSingleEmploye(currentEmployee._id));
//     }
//     dispatch(candidateList());
//   }, [dispatch, currentEmployee]);

//   const candidateListState = useSelector(state => state?.candidate?.candidatelist);
//   const vacancyListState = useSelector(state => state?.employee?.singleEmployee?.allotedVacancies);
//   const totalCandidates = candidateListState?.length;

//   const deleteHandler = (id) => {
//     dispatch(deleteCandidate(id));
//   };

//   const handleCheckboxChange = (candidateId) => {
//     setSelectedCandidates(prevSelected =>
//       prevSelected.includes(candidateId)
//         ? prevSelected.filter(id => id !== candidateId)
//         : [...prevSelected, candidateId]
//     );
//   };

//   const handleSelectAllChange = (e) => {
//     if (e.target.checked) {
//       setSelectedCandidates(candidateListState.map(candidate => candidate._id));
//     } else {
//       setSelectedCandidates([]);
//     }
//   };

//   const handleVacancyChange = (e) => {
//     setSelectedVacancy(e.target.value);
//   };

//   const handleApply = () => {
//     if (selectedCandidates.length > 0 && selectedVacancy) {
//       dispatch(applyJob({ selectedCandidates, selectedVacancy }));
//     }
//   };

//   // Filter candidates based on search input, status, city, and highest qualification
//   const filteredCandidates = candidateListState?.filter(candidate =>
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (statusFilter === '' || candidate.status === statusFilter) &&
//     (cityFilter === '' || candidate.city?.toLowerCase().includes(cityFilter.toLowerCase())) &&
//     (qualificationFilter === '' || candidate.highestQualification.toLowerCase().startsWith(qualificationFilter.toLowerCase()))
//   );

//   return (
//     <>
//       {/* Search Input and Filters */}
//       <div className="mb-3 d-flex justify-content-between align-items-center">
//         <Form.Control
//           type="text"
//           placeholder="Search by candidate name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: '22%' }}
//         />
//         <Form.Control
//           as="select"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           style={{ width: '22%' }}
//         >
//           <option value="">Filter by status</option>
//           <option value="Pending">Pending</option>
//           <option value="shortlisted">ShortListed</option>
//           <option value="Selected">Selected</option>
//           <option value="Rejected">Rejected</option>
//         </Form.Control>
//         <Form.Control
//           type="text"
//           placeholder="Search by city..."
//           value={cityFilter}
//           onChange={(e) => setCityFilter(e.target.value)}
//           style={{ width: '22%' }}
//         />
//         <Form.Control
//           type="text"
//           placeholder="Search by highest qualification..."
//           value={qualificationFilter}
//           onChange={(e) => setQualificationFilter(e.target.value)}
//           style={{ width: '22%' }}
//         />
//       </div>

//       <Card border="light" className="table-wrapper table-responsive shadow-sm">
//         <Card.Body className="pt-0">
//           <Table hover className="user-table align-items-center">
//             <thead>
//               <tr>
//                 <th className="border-bottom">
//                   {/* <Form.Check type="checkbox" onChange={handleSelectAllChange} /> */}
//                 </th>
//                 <th className="border-bottom">S.NO</th>
//                 <th className="border-bottom">Candidate Name</th>
//                 <th className="border-bottom">Mobile</th>
//                 <th className="border-bottom">Status</th>
//                 <th className="border-bottom">City</th>
//                 <th className="border-bottom">Qualification</th>
//                 <th className="border-bottom"> Action </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCandidates?.map((candidate, idx) => (
//                 <tr key={candidate._id}>
//                   <td className="border-bottom">
//                     <Form.Check
//                       type="checkbox"
//                       checked={selectedCandidates.includes(candidate._id)}
//                       onChange={() => handleCheckboxChange(candidate._id)}
//                     />
//                   </td>
//                   <td className="border-bottom">{idx + 1}</td>
//                   <td className="border-bottom">
//                     <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link>
//                   </td>
//                   <td className="border-bottom">{candidate.mobile}</td>
//                   <td className="border-bottom">{candidate.status}</td>
//                   <td className="border-bottom">{candidate.city}</td>
//                   <td className="border-bottom">{candidate.highestQualification}</td>
//                   <td className="border-bottom cursor-pointer">
//                     <FontAwesomeIcon onClick={() => deleteHandler(candidate._id)} icon={faTrashAlt} />
//                     <Link className="ms-2" to={`/edit-candidate/${candidate._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       {/* Select Vacancy and Apply Button */}
//       <div className="mt-3">
//         <Form.Group controlId="selectVacancy">
//           <Form.Label>Select Vacancy</Form.Label>
//           <Form.Control as="select" value={selectedVacancy} onChange={handleVacancyChange}>
//             <option value="">Select a vacancy</option>
//             {vacancyListState?.filter(vacancy => vacancy.status === 'Pending').map(vacancy => (
//               <option key={vacancy._id} value={vacancy._id}>
//                 {vacancy.role} - {vacancy.companyName}- {vacancy.jobLocation}
//               </option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//         <Button className="mt-2" onClick={handleApply} disabled={!selectedCandidates.length || !selectedVacancy}>
//           Shortlist Candidates
//         </Button>
//       </div>
//     </>
//   );
// };

export const CandidateTableByJob = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [statusFilter, setStatusFilter] = useState(''); // State for status filter

  const candidateListState = useSelector(state => state?.candidate?.shortListedCandidateByJob);
  const dispatch = useDispatch();
  
  // Handle status change
  const handleStatusChange = (candidateId, newStatus) => {
    const candidateData = {
      status:newStatus
    }
      // Dispatch an action to update the candidate's status in your state or backend
      dispatch(editCandidate({id:candidateId,candidateData}));
  };

  // Filter candidates based on search input and status filter
  const filteredCandidates = candidateListState?.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || candidate.status === statusFilter)
  );

  return (
      <>
          {/* Search Input and Status Filter */}
          <div className="mb-3 d-flex justify-content-between align-items-center">
              <Form.Control
                  type="text"
                  placeholder="Search by candidate name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '45%' }}
              />
              <Form.Control
                  as="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: '45%' }}
              >
                  <option value="">Filter by status</option>
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">ShortListed</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
              </Form.Control>
          </div>

          <Card border="light" className="table-wrapper table-responsive shadow-sm">
              <Card.Body className="pt-0">
                  <Table hover className="user-table align-items-center">
                      <thead>
                          <tr>
                              <th className="border-bottom">S.NO</th>
                              <th className="border-bottom">Candidate Name</th>
                              <th className="border-bottom">Mobile</th>
                              <th className="border-bottom">Status</th>
                              <th className="border-bottom">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filteredCandidates?.map((candidate, idx) => (
                              <tr key={candidate._id}>
                                  <td className="border-bottom">{idx + 1}</td>
                                  <td className="border-bottom">
                                      <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link>
                                  </td>
                                  <td className="border-bottom">{candidate.mobile}</td>
                                  <td className="border-bottom">
                                      <Form.Control
                                          as="select"
                                          value={candidate.status}  // Default to the candidate's current status
                                          onChange={(e) => handleStatusChange(candidate._id, e.target.value)}
                                      >
                                        <option value={candidate.status}>{candidate.status}</option>
                                          <option value="Pending">Pending</option>
                                          <option value="shortlisted">ShortListed</option>
                                          <option value="Interview Scheduled">Interview Scheduled</option>
                                          <option value="Selected">Selected</option>
                                          <option value="Rejected">Rejected</option>
                                      </Form.Control>
                                  </td>
                                  <td className="border-bottom">
                                      <Link to={`/edit-candidate/${candidate._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </Card.Body>
          </Card>
      </>
  );
};

export const EmployeeTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const employeeListState = useSelector(state => state?.employee?.allEmployees);

  // Pagination logic
  const indexOfLastEmployee = currentPage * entriesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - entriesPerPage;
  const currentEmployees = employeeListState?.filter(employee => employee?.role !== 'admin').slice(indexOfFirstEmployee, indexOfLastEmployee);
  
  const totalEmployees = employeeListState?.filter(employee => employee?.role !== 'admin').length;

  const deleteHandler = (id) => {
    dispatch(deleteEmployee(id));
    setTimeout(() => {
      history.push('/employee-list');
    }, 100);
  };

  const signInHandler = (email, password) => {
    dispatch(loginEmployee({ email, password }));
    setTimeout(() => {
      history.push('/dashboard'); // Redirect after successful login
    }, 500);
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when entries per page change
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Employee Name</th>
              <th className="border-bottom">Mobile</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Password</th>
              <th className="border-bottom">Action</th>
              <th className="border-bottom">Sign In</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees?.map((employee, idx) => (
              <tr key={employee._id}>
                <td className="border-bottom">{indexOfFirstEmployee + idx + 1}</td> {/* Calculate S.No */}
                <td className="border-bottom"><Link to={`/employee-detail/${employee._id}`}>{employee.name}</Link></td>
                <td className="border-bottom">{employee.mobile}</td>
                <td className="border-bottom">{employee.email}</td>
                <td className="border-bottom">{employee.storePassword}</td>
                <th className="border-bottom cursor-pointer">
                  <FontAwesomeIcon onClick={() => deleteHandler(employee._id)} icon={faTrashAlt} />
                  <Link className="ms-2" to={`/edit-employee/${employee._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                </th>
                <td className="border-bottom">
                  <button onClick={() => signInHandler(employee.email, employee.storePassword)} className="btn btn-primary btn-sm">
                    Sign In
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(totalEmployees / entriesPerPage)}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalEmployees / entriesPerPage)))} disabled={currentPage === Math.ceil(totalEmployees / entriesPerPage)}>
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};


export const CompanyTable = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  const companyListState = useSelector(state => state?.company?.allCompanies);
  
  // Pagination logic
  const indexOfLastCompany = currentPage * entriesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - entriesPerPage;
  const currentCompanies = companyListState?.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalCompanies = companyListState?.length;
  
  const deleteHandler = (id) => {
    dispatch(deleteCompany(id));
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when entries per page change
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Company Website</th>
              <th className="border-bottom">Contact Person Name</th>
              <th className="border-bottom">Contact Person Mobile</th>
              <th className="border-bottom">Contact Person Email</th>
              <th className="border-bottom">City</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies?.map((company, idx) => (
              <tr key={company._id}>
                <td className="border-bottom">{indexOfFirstCompany + idx + 1}</td> {/* Calculate S.No */}
                <td className="border-bottom">
                  <Link to={`/company-detail/${company._id}`}>{company.companyName}</Link>
                </td>
                <td className="border-bottom">{company.companyWebsite}</td>
                <td className="border-bottom">{company.contactPersonName}</td>
                <td className="border-bottom">{company.contactPersonMobile}</td>
                <td className="border-bottom">{company.contactPersonEmail}</td>
                <td className="border-bottom">{company.city}</td>
                <td className="border-bottom cursor-pointer">
                  <FontAwesomeIcon onClick={() => deleteHandler(company._id)} icon={faTrashAlt} />
                  <Link className="ms-2" to={`/edit-company/${company._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(totalCompanies / entriesPerPage)}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalCompanies / entriesPerPage)))} disabled={currentPage === Math.ceil(totalCompanies / entriesPerPage)}>
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};
export const VacancyTable = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  useEffect(() => {
    dispatch(getAllVacancies());
    dispatch(getAllEmployees());
  }, [dispatch]);

  const vacancyListState = useSelector((state) => state?.vacancy?.allVacancies);
  const employees = useSelector((state) => state?.employee?.allEmployees);

  // Filter vacancies based on the search query
  const filteredVacancies = (vacancyListState || []).filter(vacancy =>
    vacancy.jobLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort vacancies
  const sortedVacancies = [...filteredVacancies].sort((a, b) => {
    if (!a.allotedTo) return -1;
    if (!b.allotedTo) return 1;
    return 0;
  });

  // Pagination logic
  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = sortedVacancies.slice(indexOfFirstVacancy, indexOfLastVacancy);

  // Total pages
  const totalPages = Math.ceil(sortedVacancies.length / entriesPerPage);

  const handleAllotedToChange = (vacancyId, employeeId) => {
    dispatch(editVacancy({ id: vacancyId, allotedTo: employeeId }));
  };

  const deleteHandler = (id) => {
    dispatch(deleteVacancy(id));
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Search Bar */}
        <Form.Group className="mb-3 mt-3">
          <Form.Control
            type="text"
            placeholder="Search by location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>

        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when entries per page change
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              {/* <th>S. No</th> */}
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Function</th>
              <th className="border-bottom">Alloted To</th>
              <th className="border-bottom">Dead Line</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies.map((vacancy,idx) => (

              <tr key={vacancy._id} style={{ backgroundColor: !vacancy.allotedTo ? 'rgba(255, 0, 0, 0.2)' : 'transparent' }}>
                {/* <td className="border-bottom">{(idx +1)+entriesPerPag}</td> */}

                <td className="border-bottom">
                  <Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link>
                </td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{vacancy.jobFunction}</td>
                <td className="border-bottom">
                  <Form.Control
                    as="select"
                    value={vacancy.allotedTo?._id || ''}
                    onChange={(e) => handleAllotedToChange(vacancy._id, e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees?.map((employee) =>
                      employee.role !== 'admin' ? (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ) : null
                    )}
                  </Form.Control>
                </td>
                <td className="border-bottom">{vacancy.deadline}</td>
                <td className="border-bottom cursor-pointer">
                  <FontAwesomeIcon onClick={() => deleteHandler(vacancy._id)} icon={faTrashAlt} />
                  <Link className="ms-2" to={`/edit-vacancy/${vacancy._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};


export const AdminTable = ({vacancyListState}) => {
  const dispatch = useDispatch()
  const [updatedVacancy, setUpdatedVacancy] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const employees = useSelector((state) => state?.employee?.allEmployees);


  const handleAllotedToChange = (vacancyId, employeeId) => {
    setUpdatedVacancy({ ...updatedVacancy, [vacancyId]: employeeId });
    dispatch(editVacancy({ id: vacancyId, allotedTo: employeeId }));
  };

  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = vacancyListState?.slice(indexOfFirstVacancy, indexOfLastVacancy);
  
  const totalVacancies = vacancyListState?.length;
  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
      <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when entries per page change
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Function</th>
              <th className="border-bottom">Alloted To</th>
              <th className="border-bottom">Dead Line</th>
              {/* <th className="border-bottom"> Action </th> */}
              {/* <th className="border-bottom"><FontAwesomeIcon icon={faEdit} /></th> */}
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy, idx) => (
              <tr key={vacancy._id}>
                <td className="border-bottom">{idx + 1}</td>
                <td className="border-bottom"><Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link></td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{vacancy.jobFunction}</td>
                <td className="border-bottom">
                  <Form.Control
                    as="select"
                    value={updatedVacancy[vacancy._id] || vacancy.allotedTo?._id || ''}
                    onChange={(e) => handleAllotedToChange(vacancy._id, e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees?.map((employee) => (
                      employee.role !== 'admin' ? (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ) : null
                    ))}
                  </Form.Control>
                </td>
                <td className="border-bottom">{vacancy.deadline}</td>
              </tr>
            ))}
          </tbody>
        </Table>
    
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(totalVacancies / entriesPerPage)}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalVacancies / entriesPerPage)))} disabled={currentPage === Math.ceil(totalVacancies / entriesPerPage)}>
            Next
          </button>
        </div>

      </Card.Body>
    </Card>
  );
};

export const AllCompletedVacancyTable = ({ todayVac }) => {
  const dispatch = useDispatch();
  const today = new Date().toLocaleDateString('en-GB');

  // States for search inputs
  const [locationSearch, setLocationSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [jobTitleSearch, setJobTitleSearch] = useState(""); // New state for job title search

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  useEffect(() => {
    dispatch(getAllVacancies());
    dispatch(getAllEmployees());
  }, [dispatch]);

  const statusChangeHandler = (id, status) => {
    dispatch(editVacancy({ id, status, isAdmin: true }));
  };

  let vacancyListState = useSelector((state) => state?.vacancy?.allVacancies);

  if (todayVac) {
    vacancyListState = vacancyListState.filter((vacancy) => {
      const completedDate = new Date(vacancy.completedDate).toLocaleDateString('en-GB');
      return completedDate == today;
    });
  }

  const [updatedVacancy, setUpdatedVacancy] = useState({});

  const handleMailStatusChange = (vacancyId, status) => {
    setUpdatedVacancy({
      ...updatedVacancy,
      [vacancyId]: { ...updatedVacancy[vacancyId], mail: status },
    });
    dispatch(editVacancy({ id: vacancyId, mail: status }));
  };

  const handleInterviewDateChange = (vacancyId, date) => {
    setUpdatedVacancy({
      ...updatedVacancy,
      [vacancyId]: { ...updatedVacancy[vacancyId], interviewSheduled: date },
    });
    dispatch(editVacancy({ id: vacancyId, interviewSheduled: date }));
  };

  const formatInterviewDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Filter vacancies based on search inputs
  const filteredVacancyList = vacancyListState
    ?.filter((vacancy) => 
      vacancy.companyName.toLowerCase().includes(companySearch.toLowerCase()) &&
      vacancy.jobLocation.toLowerCase().includes(locationSearch.toLowerCase()) &&
      vacancy.role.toLowerCase().includes(jobTitleSearch.toLowerCase())
    )
    ?.filter((vacancy) => vacancy.status === 'completed')
    ?.sort((a, b) => {
      const mailA = updatedVacancy[a._id]?.mail || a.mail;
      const mailB = updatedVacancy[b._id]?.mail || b.mail;
      return mailA === 'pending' && mailB !== 'pending' ? -1 : 1;
    });

  // Pagination logic
  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = filteredVacancyList?.slice(indexOfFirstVacancy, indexOfLastVacancy);

  // Total pages
  const totalPages = Math.ceil(filteredVacancyList?.length / entriesPerPage);

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Search Inputs */}
        <div className="d-flex my-3">
          <input
            type="text"
            placeholder="Search by company name"
            className="form-control me-2"
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by location"
            className="form-control me-2"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by job title"
            className="form-control"
            value={jobTitleSearch}
            onChange={(e) => setJobTitleSearch(e.target.value)}
          />
        </div>

        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom px-5">Mail Status</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Alloted To</th>
              <th className="border-bottom px-6">Status</th>
              <th className="border-bottom">Dead Line</th>
              <th className="border-bottom">Completed At</th>
              <th className="border-bottom">Interview Scheduled</th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy, idx) => (
              <tr key={vacancy._id} style={{ backgroundColor: vacancy.mail === 'pending' ? 'rgba(220, 53, 69, 0.3)' : '' }}>
                <td className="border-bottom">{indexOfFirstVacancy + idx + 1}</td>
                <td className="border-bottom">
                  <Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link>
                </td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">
                  <Form.Control
                    as="select"
                    value={updatedVacancy[vacancy._id]?.mail || vacancy.mail}
                    onChange={(e) => handleMailStatusChange(vacancy._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="sent">Sent</option>
                  </Form.Control>
                </td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{vacancy.allotedTo?.name}</td>
                <td className="border-bottom">
                  <select
                    value={vacancy.status}
                    onChange={(e) => statusChangeHandler(vacancy._id, e.target.value)}
                    className="form-select px-2"
                  >
                    <option value="completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
                <td className="border-bottom">{vacancy.deadline}</td>
                <td className="border-bottom">{new Date(vacancy.updatedAt).toLocaleString()}</td>
                <td className="border-bottom">
                  <input
                    type="date"
                    value={formatInterviewDate(updatedVacancy[vacancy._id]?.interviewSheduled || vacancy.interviewSheduled)}
                    onChange={(e) => handleInterviewDateChange(vacancy._id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};





export const VacancyTableByCompany = ({ vacancyListState }) => {
  const dispatch = useDispatch();
  
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  
  const totalVacancies = vacancyListState?.length;

  const deleteHandler = (id) => {
    dispatch(deleteVacancy(id));
  };

  // Filtered vacancies based on search query
  const filteredVacancies = vacancyListState?.filter(vacancy => 
    vacancy.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
    vacancy.jobLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search bar */}
      <Form className="mb-4">
        <Form.Control 
          type="text" 
          placeholder="Search by job title or location..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </Form>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">S.NO</th>
                <th className="border-bottom">Job Title</th>
                <th className="border-bottom">Company Name</th>
                <th className="border-bottom">No. Of Posts</th>
                <th className="border-bottom">Location</th>
                <th className="border-bottom">Salary</th>
                <th className="border-bottom">Dead Line</th>
                <th className="border-bottom"></th>
                <th className="border-bottom"></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredVacancies?.map((vacancy, idx) => {
                  return (
                    <tr key={vacancy._id}>
                      <td className="border-bottom">{idx + 1}</td>
                      <td className="border-bottom">
                        <Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link>
                      </td>
                      <td className="border-bottom">{vacancy.companyName}</td>
                      <td className="border-bottom">{vacancy.numberOfJobOpenings}</td>
                      <td className="border-bottom">{vacancy.jobLocation}</td>
                      <td className="border-bottom">{vacancy.salary}</td>
                      <td className="border-bottom">{vacancy.deadline}</td>
                      <td className="border-bottom cursor-pointer">
                        <FontAwesomeIcon onClick={() => deleteHandler(vacancy._id)} icon={faTrashAlt} />
                        <Link to={`/edit-vacancy/${vacancy._id}`} className="ms-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export const JobAppliedBy = ({id}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(jobsAppliedByCandidate(id))
  },[])

  const jobAppliedState = useSelector(state => state.candidate?.jobsApllied)
  console.log(jobAppliedState)
  
  const totalVacancies = jobAppliedState?.length;

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              {/* <th className="border-bottom">Job Type</th> */}
              <th className="border-bottom">Dead Line</th>
            </tr>
          </thead>
          <tbody>
            {
              jobAppliedState?.map((job, idx) => {
                return (
                  <tr key={job._id}>
                    <td className="border-bottom">{idx + 1}</td>
                    <td className="border-bottom">{job?.jobId?.role}</td>
                    <td className="border-bottom">{job?.jobId?.companyName}</td>
                    <td className="border-bottom">{job?.jobId?.jobLocation}</td>
                    <td className="border-bottom">{job?.jobId?.salary}</td>
                    <td className="border-bottom">{job?.jobId?.deadline}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      
      </Card.Body>
    </Card>
  );
};


export const AllotedVacansiesByEmployee = ({ vacancyListState, pending }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  // Handler to update the status of a specific vacancy
  const statusChangeHandler = (id, status) => {
    dispatch(editVacancy({ id, status }));
  };

  // Filter the vacancies based on pending status if `pending` is true
  const filteredVacancies = pending
    ? vacancyListState?.filter(
        (vacancy) =>
          vacancy.status === "Pending" &&
          new Date(vacancy.deadline).toLocaleDateString() >=
            new Date().toLocaleDateString()
      )
    : vacancyListState;

  // Pagination logic
  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = filteredVacancies?.slice(
    indexOfFirstVacancy,
    indexOfLastVacancy
  );

  const totalVacancies = filteredVacancies?.length;

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to the first page when entries per page change
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">No. Of Posts</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Deadline</th>
              <th className="border-bottom">Gender</th>
              <th className="border-bottom">Job Function</th>
              <th className="border-bottom">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy) => (
              <tr
                key={vacancy._id}
                style={{
                  backgroundColor:pending?
                    new Date(vacancy.deadline).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "rgba(220, 53, 69, 0.3)"
                      : "transparent" : null
                }}
                className="border-bottom"
              >
                <td className="border-bottom">
                  <Link to={`/candidate-shortlisted/${vacancy._id}`}>
                    {vacancy.role}
                  </Link>
                </td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.numberOfJobOpenings}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{vacancy.deadline}</td>
                <td className="border-bottom">{vacancy.gender}</td>
                <td className="border-bottom">{vacancy.jobFunction}</td>
                <td className="border-bottom">
                  <select
                    value={vacancy.status} // Ensure this reflects the current status
                    onChange={(e) =>
                      statusChangeHandler(vacancy._id, e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(totalVacancies / entriesPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalVacancies / entriesPerPage))
              )
            }
            disabled={currentPage === Math.ceil(totalVacancies / entriesPerPage)}
          >
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};


export const IncompleteVacanciesTable = ({ vacancyListState, allvac }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.employee?.allEmployees);

  const [reasons, setReasons] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page
  const [editedDeadlines, setEditedDeadlines] = useState({}); // Store edited deadlines locally

  const handleAllotedToChange = (vacancyId, employeeId) => {
    dispatch(editVacancy({ id: vacancyId, allotedTo: employeeId }));
  };

  const statusChangeHandler = (id, status) => {
    dispatch(editVacancy({ id, status }));
  };

  const handleReasonChange = (id, reason) => {
    setReasons((prev) => ({
      ...prev,
      [id]: reason,
    }));
  };

  const handleReasonSubmit = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const reason = reasons[id];
      if (reason) {
        dispatch(editVacancy({ id, reason }));
        alert("Reason updated successfully!"); // Optional alert, can be removed
      }
    }
  };

  const handleDeadlineChange = (id, newDeadline) => {
    setEditedDeadlines((prev) => ({
      ...prev,
      [id]: newDeadline,
    }));

    dispatch(editVacancy({ id, deadline: newDeadline }));
    alert("Deadline updated successfully!");
  };

  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = vacancyListState?.slice(indexOfFirstVacancy, indexOfLastVacancy);
  const totalVacancies = vacancyListState?.length;

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to the first page when entries per page change
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Deadline</th>
              <th className="border-bottom px-6">Alloted To</th>
              <th className="border-bottom">Gender</th>
              <th className="border-bottom">Job Function</th>
              <th className="border-bottom px-6">Status</th>
              <th className="border-bottom px-8">Reason</th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy) => (
              <tr
                key={vacancy._id}
                style={{
                  backgroundColor: new Date(vacancy.deadline).toLocaleDateString() === new Date().toLocaleDateString()
                    ? 'rgba(220, 53, 69, 0.3)'
                    : 'transparent',
                }}
                className="border-bottom"
              >
                <td className="border-bottom">
                  <Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link>
                </td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                
                <td className="border-bottom">
                  {allvac ? (
                    <div>
                      <input
                        type="date"
                        value={editedDeadlines[vacancy._id] || vacancy.deadline || ''}
                        onChange={(e) => handleDeadlineChange(vacancy._id, e.target.value)}
                        // onKeyDown={(e) => handleDeadlineKeyDown(e, vacancy._id)} // Trigger on 'Enter' key press
                      />
                    </div>
                  ) : (
                    vacancy.deadline
                  )}
                </td>

                <td className="border-bottom">
                  <Form.Control
                    as="select"
                    value={vacancy.allotedTo?._id || ''}
                    onChange={(e) => handleAllotedToChange(vacancy._id, e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees?.map((employee) =>
                      employee.role !== 'admin' ? (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ) : null
                    )}
                  </Form.Control>
                </td>
                <td className="border-bottom">{vacancy.gender}</td>
                <td className="border-bottom">{vacancy.jobFunction}</td>
                <td className="border-bottom">
                  <select
                    value={vacancy.status}
                    onChange={(e) => statusChangeHandler(vacancy._id, e.target.value)}
                    className="form-select"
                  >
                    <option value="completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
                
                <td className="border-bottom">
                  {!allvac ? (
                    <textarea
                      value={reasons[vacancy._id] || vacancy.reason || ''}
                      onChange={(e) => handleReasonChange(vacancy._id, e.target.value)}
                      onKeyDown={(e) => handleReasonSubmit(e, vacancy._id)}
                      placeholder="Enter reason"
                      rows={2}
                      className="form-control"
                    />
                  ) : (
                    <p>{vacancy.reason}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(totalVacancies / entriesPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalVacancies / entriesPerPage)))
            }
            disabled={currentPage === Math.ceil(totalVacancies / entriesPerPage)}
          >
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};


export const AllotedCompletedVacansiesByEmployee = ({ vacancyListState }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  // Handler to update the status of a specific vacancy
  const statusChangeHandler = (id, status) => {
    dispatch(editVacancy({ id, status }));
  };

  // Pagination logic
  const completedVacancies = vacancyListState?.filter(vacancy => vacancy.status === 'completed');
  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = completedVacancies?.slice(indexOfFirstVacancy, indexOfLastVacancy);

  const totalVacancies = completedVacancies?.length;

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when entries per page change
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Deadline</th>
              <th className="border-bottom">Gender</th>
              <th className="border-bottom">Job Function</th>
              <th className="border-bottom px-6">Status</th>
              <th className="border-bottom">Interview Scheduled</th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy, idx) => (
              <tr key={vacancy._id}>
                <td className="border-bottom">{indexOfFirstVacancy + idx + 1}</td>
                <td className="border-bottom">
                  <Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link>
                </td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{vacancy.deadline}</td>
                <td className="border-bottom">{vacancy.gender}</td>
                <td className="border-bottom">{vacancy.jobFunction}</td>
                <td className="border-bottom">
                  <select
                    value={vacancy.status}
                    onChange={(e) => statusChangeHandler(vacancy._id, e.target.value)}
                    className="form-select"
                  >
                    <option value="completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
                <td className="border-bottom">{vacancy.interviewSheduled ? new Date(vacancy.interviewSheduled).toLocaleDateString('en-GB') : 'NA'}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(totalVacancies / entriesPerPage)}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalVacancies / entriesPerPage)))} disabled={currentPage === Math.ceil(totalVacancies / entriesPerPage)}>
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export const TodaysInterview = (props ) => {
  const today = new Date().toLocaleDateString('en-GB'); // Get today's date in DD-MM-YYYY format

  // Filter the vacancies to only include those with today's interview date
  const todaysInterviews = props.vacancyListState?.filter(vacancy => {
    const interviewDate = new Date(vacancy.interviewSheduled).toLocaleDateString('en-GB');
    return interviewDate === today;
  });


  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Deadline</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Interview Scheduled</th>
            </tr>
          </thead>
          <tbody>
            {todaysInterviews?.map((vacancy, idx) => (
              <tr key={vacancy._id}>
                <td className="border-bottom">{idx + 1}</td>
                <td className="border-bottom">
                  <Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link>
                </td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{vacancy.deadline}</td>
                <td className="border-bottom">
                 {vacancy.status}
                </td>
                <td className="border-bottom">
                  {vacancy.interviewSheduled
                    ? new Date(vacancy.interviewSheduled).toLocaleDateString('en-GB')
                    : 'NA'}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};


export const MailSentVacanciesByEmployee = ({ vacancyListState }) => {
  const dispatch = useDispatch();
  const [vacStatus, setVacStatus] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page

  // Filter vacancies to only include those with mail status 'sent'
  const filteredVacancies = vacancyListState?.filter(vacancy => vacancy.mail === 'sent');
  const totalVacancies = filteredVacancies?.length;

  // Pagination logic
  const indexOfLastVacancy = currentPage * entriesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - entriesPerPage;
  const currentVacancies = filteredVacancies?.slice(indexOfFirstVacancy, indexOfLastVacancy);

  const statusChangeHandler = (id, status) => {
    dispatch(editVacancy({ id, status }));
    setVacStatus(status);
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {/* Entries per page */}
        <div className="my-3">
          <label>Entries per page: </label>
          <select value={entriesPerPage} onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page when entries per page change
          }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">S.NO</th>
              <th className="border-bottom">Job Title</th>
              <th className="border-bottom">Company Name</th>
              <th className="border-bottom">Location</th>
              <th className="border-bottom">Salary</th>
              <th className="border-bottom">Dead Line</th>
              <th className="border-bottom px-6">Status</th>
              <th className="border-bottom">Interview Scheduled</th>
            </tr>
          </thead>
          <tbody>
            {currentVacancies?.map((vacancy, idx) => (
              <tr key={vacancy._id}>
                <td className="border-bottom">{indexOfFirstVacancy + idx + 1}</td>
                <td className="border-bottom"><Link to={`/candidate-shortlisted/${vacancy._id}`}>{vacancy.role}</Link></td>
                <td className="border-bottom">{vacancy.companyName}</td>
                <td className="border-bottom">{vacancy.jobLocation}</td>
                <td className="border-bottom">{vacancy.salary}</td>
                <td className="border-bottom">{new Date(vacancy.deadline).toLocaleDateString()}</td>
                <td className="border-bottom">
                  <select
                    value={vacStatus === "" ? vacancy.status : vacStatus}
                    onChange={(e) => statusChangeHandler(vacancy._id, e.target.value)}
                    className="form-select"
                  >
                    <option value="completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
                <td className="border-bottom">{vacancy.interviewSheduled ? new Date(vacancy.interviewSheduled).toLocaleDateString() : "NA"}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between my-3">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {Math.ceil(totalVacancies / entriesPerPage)}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalVacancies / entriesPerPage)))} disabled={currentPage === Math.ceil(totalVacancies / entriesPerPage)}>
            Next
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};


export const EnquiryTable = () => {
  const enquiries = useSelector(state => state.contact?.getAll)

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
          <tr>
                <th className="border-bottom">S.NO</th>
                <th className="border-bottom">Name</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Mobile</th>
                <th className="border-bottom">Subject</th>
                <th className="border-bottom">message</th>
               
              </tr>
          </thead>
          <tbody>
          {
              enquiries?.map((enq,idx)=> {
                return <tr>
                <td className="border-bottom">{idx+1}</td>
                <td className="border-bottom">{enq?.name}</td>
                <td className="border-bottom">{enq?.email}</td>
                <td className="border-bottom">{enq?.phone}</td>
                <td className="border-bottom">{enq?.subject}</td>
                <td className="border-bottom">{enq?.message}</td>

                </tr>
              })
            }
          
       
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(candidateList())
    },[])
    const candidateListState = useSelector(state => state?.candidate?.candidatelist)
    const totalCandidates = candidateListState?.length;
    const deleteHandler = (id)=>{
      dispatch(deleteCandidate(id))
    }

  // const TableRow = (props) => {
  //   const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
  //   const statusVariant = status === "Paid" ? "success"
  //     : status === "Due" ? "warning"
  //       : status === "Canceled" ? "danger" : "primary";

  //   return (
  //     <tr>
  //       <td>
  //         <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
  //           {invoiceNumber}
  //         </Card.Link>
  //       </td>
  //       <td>
  //         <span className="fw-normal">
  //           {subscription}
  //         </span>
  //       </td>
  //       <td>
  //         <span className="fw-normal">
  //           {issueDate}
  //         </span>
  //       </td>
  //       <td>
  //         <span className="fw-normal">
  //           {dueDate}
  //         </span>
  //       </td>
  //       <td>
  //         <span className="fw-normal">
  //           ${parseFloat(price).toFixed(2)}
  //         </span>
  //       </td>
  //       <td>
  //         <span className={`fw-normal text-${statusVariant}`}>
  //           {status}
  //         </span>
  //       </td>
  //       <td>
  //         <Dropdown as={ButtonGroup}>
  //           <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
  //             <span className="icon icon-sm">
  //               <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
  //             </span>
  //           </Dropdown.Toggle>
  //           <Dropdown.Menu>
  //             <Dropdown.Item>
  //               <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
  //             </Dropdown.Item>
  //             <Dropdown.Item>
  //               <FontAwesomeIcon icon={faEdit} className="me-2" /> <FontAwesomeIcon icon={faEdit} />
  //             </Dropdown.Item>
  //             <Dropdown.Item className="text-danger">
  //               <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
  //             </Dropdown.Item>
  //           </Dropdown.Menu>
  //         </Dropdown>
  //       </td>
  //     </tr>
  //   );
  // };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
          <tr>
                <th className="border-bottom">S.NO</th>
                <th className="border-bottom">Candidate Name</th>
                <th className="border-bottom">Mobile</th>
                <th className="border-bottom">Status</th>
                {/* <th className="border-bottom">Total</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th> */}
                {/* <th className="border-bottom">  <FontAwesomeIcon icon={faTrashAlt} /> </th> */}
              </tr>
          </thead>
          <tbody>
          {
              candidateListState?.map((candidate,idx)=> {
                return <tr>
                <td className="border-bottom">{idx+1}</td>
                <td className="border-bottom">{candidate.name}</td>
                <td className="border-bottom">{candidate.mobile}</td>
                <td className="border-bottom">{candidate.status}</td>
                <th className="border-bottom cursor-pointer" onClick={()=> deleteHandler(candidate._id)}>  <FontAwesomeIcon icon={faTrashAlt} /> </th>
                <th className="border-bottom"><FontAwesomeIcon icon={faEdit} /></th>
                </tr>
              })
            }
          
            {/* {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)} */}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalCandidates}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};


export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};