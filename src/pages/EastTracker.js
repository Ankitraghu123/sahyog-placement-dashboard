import React, { useEffect, useState, useMemo } from 'react';
import { Card, Form, Table } from '@themesberg/react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleVacancies } from '../features/vacancy/vacancySlice';
import { CSVLink } from 'react-csv';

export default function CandidateList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const candidateListState = useSelector(state => state.candidate.shortListedCandidateByJob || []);
  const vacancy = useSelector(state => state.vacancy.singleVacancy);

  useEffect(() => {
    dispatch(getSingleVacancies(id));
  }, [dispatch, id]);

  const filteredCandidates = candidateListState.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (isoDate)=>{
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate
  }

  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    // Adjust if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

  const csvData = useMemo(() => {
    const candidatesToExport = selectedCandidates.length > 0 ? selectedCandidates : filteredCandidates;
    return candidatesToExport.map((candidate, idx) => ({
     "Role": vacancy?.role,
    "Role Location": vacancy?.jobLocation,
    "Candidate Name": candidate.name,
    "Mobile No": candidate.mobile,
    "Email Id": candidate.email,
    "Dob": formatDate(candidate.dob),
    "Gender": candidate.gender,
    "Candidate Location": candidate.city,
    "State": candidate.state,
    "Two Wheeler(Y/N)": candidate.twoWheelerAvailable ? candidate.twoWheelerAvailable : "Yes",
    "10%": candidate.tenthPercentage,
    "10% Passing Year": candidate.tenthPassingYear,
    "12%": candidate.twelfthPercentage,
    "12% Passing Year": candidate.twelfthPassingYear,
    "Graduation%": candidate.gradPercentage,
    "Graduation Passing Year": candidate.gradPassingYear,
    "Post Graduation%": candidate.postGradPercentage,
    "Post Graduation Passing Year": candidate.postGradPassingYear,
    "Total Experience": candidate.experience || "Fresher",
    "Current CTC": candidate.currentCtc || "N/A",
    "Job Profile Explained (Y/N)": "Yes",
    "CTC Informed to Candidate (Y/N)": "Yes",
    "Off Role Nature of Job Explained to Candidate (Y/N)": "Yes",
    "Consultant Name": "Sahyog job and multi work solutions",
    "Remark": candidate.remarks || "N/A"
    }));
  }, [selectedCandidates, filteredCandidates, vacancy]);

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Control
          type="text"
          placeholder="Search by candidate name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '45%' }}
        />
        <CSVLink
          data={csvData}
          filename={`candidates_${id}.csv`}
          className="btn btn-primary"
          target="_blank"
        >
          Export CSV
        </CSVLink>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm border-success">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
          <thead>
  <tr>
    <th className="border-bottom border-success">Select</th>
    {/* <th className="border-bottom">S.NO</th> */}
    <th className="border-bottom border-success">Role</th>
    <th className="border-bottom border-success">Role Location</th>
    <th className="border-bottom border-success">Candidate Name</th>
    <th className="border-bottom border-success">Mobile No</th>
    <th className="border-bottom border-success">Email Id</th>
    <th className="border-bottom border-success">Dob</th>
    <th className="border-bottom border-success">Gender</th>
    <th className="border-bottom border-success">Candidate Location</th>
    <th className="border-bottom border-success">State</th>
    <th className="border-bottom border-success">Two Wheeler(Y?N)</th>
    <th className="border-bottom border-success">10%</th>
    <th className="border-bottom border-success">Passing Year</th>
    <th className="border-bottom border-success">12%</th>
    <th className="border-bottom border-success">Passing Year</th>
    <th className="border-bottom border-success">Graduation%</th>
    <th className="border-bottom border-success">Passing Year</th>
    <th className="border-bottom border-success">Post Graduation%</th>
    <th className="border-bottom border-success">Passing Year</th>
    <th className="border-bottom border-success">Total Experience (if no exp please write fresher) </th>
    <th className="border-bottom border-success">Current CTC if employed</th>
    <th className="border-bottom border-success">Job Profile explained Candidate(Y/N)</th>
    <th className="border-bottom border-success">CTC informed to candidate(Y/N)</th>
    <th className="border-bottom border-success">Off Role Nature Of Job Explained to Candidate(Y/N)</th>

    <th className="border-bottom border-success">Consultant Name </th>
    <th className="border-bottom border-success">Remark </th>

  </tr>
</thead>
<tbody>
  {filteredCandidates.map((candidate, idx) => (
    <tr key={candidate._id}>
      <td className="border-bottom border-success">
        <input
          type="checkbox"
          checked={selectedCandidates.some(selected => selected._id === candidate._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedCandidates(prev => [...prev, candidate]);
            } else {
              setSelectedCandidates(prev => prev.filter(selected => selected._id !== candidate._id));
            }
          }}
        />
      </td>
      {/* <td className="border-bottom">{idx + 1}</td> */}
      <td className="border-bottom border-success">{vacancy?.role}</td>
      <td className="border-bottom border-success">{vacancy?.jobLocation}</td>
      <td className="border-bottom border-success">{candidate.name}</td>
      <td className="border-bottom border-success">{candidate.mobile}</td>
      <td className="border-bottom border-success">{candidate.email}</td>
      <td className="border-bottom border-success"> {formatDate(candidate.dob)}</td>
      <td className="border-bottom border-success">{candidate.gender}</td>
      <td className="border-bottom border-success">{candidate.city}</td>
      <td className="border-bottom border-success">{candidate.state}</td>
      <td className="border-bottom border-success">{candidate.twoWheelerAvailable ? candidate.twoWheelerAvailable : "Yes"}</td>
      <td className="border-bottom border-success">{candidate.tenthPercentage}</td>
      <td className="border-bottom border-success">{candidate.tenthPassingYear}</td>
      <td className="border-bottom border-success">{candidate.twelfthPercentage}</td>
      <td className="border-bottom border-success">{candidate.tenthPassingYear}</td>
      <td className="border-bottom border-success">{candidate.gradPercentage}</td>
      <td className="border-bottom border-success">{candidate.gradPassingYear}</td>
      <td className="border-bottom border-success">{candidate.postGradPercentage}</td>
      <td className="border-bottom border-success">{candidate.postGradPassingYear}</td>
      <td className="border-bottom border-success"></td>
      <td className="border-bottom border-success"></td>
      <td className="border-bottom border-success">Yes</td>
      <td className="border-bottom border-success">Yes</td>
      <td className="border-bottom border-success">Yes</td>
      <td className="border-bottom border-success">Sahyog job and multi work solutions
      </td>
      <td className="border-bottom border-success">{candidate.remarks}</td>
    </tr>
  ))}
</tbody>

          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
