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
      // "S.No": idx + 1,
      "Date Sourced/ Profile Received": candidate.dateSourced || '',
      "Profile/Role": vacancy?.role || '',
      "Candidate Name": candidate.name || '',
      "Years of exp": candidate.yearsOfExperience || '',
      "Current CTC": candidate.currentCTC || '',
      "Location": (candidate.state && candidate.city) ? `${candidate.state} - ${candidate.city}`: '',
      "Current Designation": candidate.currentDesignation || '',
      "Current Organization": candidate.currentOrganization || '',
      "Contact Details": candidate.mobile || '',
      "Email ID": candidate.email || '',
      "Higher Qualification": candidate.highestQualification || '',
      "Exp CTC": candidate.expectedCTC || '',
      "Diploma Part / Full": candidate.diplomaDetails || '',
      "Graduation %": candidate.gradPercentage || '',
      "Graduation Year":candidate.gradApplyYear && candidate.gradPassingYear ? `${candidate.gradApplyYear} - ${candidate.gradPassingYear}` : '',
      "12th Passing Year": candidate.twelfthPassingYear || '',
      "12th %": candidate.twelfthPercentage || '',
      "10th Pass Year": candidate.tenthPassingYear || '',
      "10th %": candidate.tenthPercentage || '',
      "Date of Birth": candidate.dob ? formatDate(candidate.dob) : '',
      "AGE": candidate.dob ? calculateAge(candidate.dob) : '',
      "Notice Period": candidate.noticePeriod || '',
      "Remarks": candidate.remarks || '',
      "Source": 'Sahyog job and multi work solutio'
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

      <Card border="light" className="table-wrapper table-responsive shadow-sm border-warning">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
          <thead>
  <tr>
    <th className="border-bottom border-warning">Select</th>
    {/* <th className="border-bottom">S.NO</th> */}
    <th className="border-bottom border-warning">Date Sourced/ Profile Received</th>
    <th className="border-bottom border-warning">Profile/Role</th>
    <th className="border-bottom border-warning">Candidate Name</th>
    <th className="border-bottom border-warning">Years of exp</th>
    <th className="border-bottom border-warning">Current CTC</th>
    <th className="border-bottom border-warning">Location</th>
    <th className="border-bottom border-warning">Current Designation</th>
    <th className="border-bottom border-warning">Current Organization</th>
    <th className="border-bottom border-warning">Contact Details</th>
    <th className="border-bottom border-warning">Email ID</th>
    <th className="border-bottom border-warning">Higher Qualification</th>
    <th className="border-bottom border-warning">Exp CTC</th>
    <th className="border-bottom border-warning">Diploma Part / Full</th>
    <th className="border-bottom border-warning">grad %</th>
    <th className="border-bottom border-warning">grad Year</th>
    <th className="border-bottom border-warning">12th Passing Year</th>
    <th className="border-bottom border-warning">12th %</th>
    <th className="border-bottom border-warning">10th Pass Year</th>
    <th className="border-bottom border-warning">10th %</th>
    <th className="border-bottom border-warning">Date of Birth</th>
    <th className="border-bottom border-warning">AGE</th>
    <th className="border-bottom border-warning">Notice Period</th>
    <th className="border-bottom border-warning">Remarks</th>
    <th className="border-bottom border-warning">Source</th>
  </tr>
</thead>
<tbody>
  {filteredCandidates.map((candidate, idx) => (
    <tr key={candidate._id}>
      <td className="border-bottom border-warning">
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
      <td className="border-bottom border-warning">{candidate.dateSourced}</td>
      <td className="border-bottom border-warning">{vacancy?.role}</td>
      <td className="border-bottom border-warning">{candidate.name}</td>
      <td className="border-bottom border-warning">{candidate.yearsOfExperience}</td>
      <td className="border-bottom border-warning">{candidate.currentCTC}</td>
      <td className="border-bottom border-warning">{candidate.state}- {candidate.city}</td>
      <td className="border-bottom border-warning">{candidate.currentDesignation}</td>
      <td className="border-bottom border-warning">{candidate.currentOrganization}</td>
      <td className="border-bottom border-warning">{candidate.mobile}</td>
      <td className="border-bottom border-warning">{candidate.email}</td>
      <td className="border-bottom border-warning">{candidate.highestQualification}</td>
      <td className="border-bottom border-warning">{candidate.expectedCTC}</td>
      <td className="border-bottom border-warning">{candidate.diplomaDetails}</td>
      <td className="border-bottom border-warning">{candidate.gradPercentage}</td>
      <td className="border-bottom border-warning">{candidate.gradApplyYear}-{candidate.gradPassingYear}</td>
      <td className="border-bottom border-warning">{candidate.twelfthPassingYear}</td>
      <td className="border-bottom border-warning">{candidate.twelfthPercentage}</td>
      <td className="border-bottom border-warning">{candidate.tenthPassingYear}</td>
      <td className="border-bottom border-warning">{candidate.tenthPercentage}</td>
      <td className="border-bottom border-warning">{formatDate(candidate.dob)}</td>
      <td className="border-bottom border-warning">{ calculateAge(candidate.dob)}</td>
      <td className="border-bottom border-warning">{candidate.noticePeriod}</td>
      <td className="border-bottom border-warning">{candidate.remarks}</td>
      <td className="border-bottom border-warning">Sahyog job and multi work solutions
      </td>
    </tr>
  ))}
</tbody>

          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
