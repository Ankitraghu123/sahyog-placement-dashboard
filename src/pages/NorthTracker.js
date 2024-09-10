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

  const csvData = useMemo(() => {
    const candidatesToExport = selectedCandidates.length > 0 ? selectedCandidates : filteredCandidates;
    return candidatesToExport.map((candidate, idx) => ({
      "S.No": idx + 1,
      "Date Sourced/ Profile Received": candidate.dateSourced || '',
      "Profile/Role": vacancy?.role || '',
      "Candidate Name": candidate.name || '',
      "Years of exp": candidate.yearsOfExperience || '',
      "Current CTC": candidate.currentCTC || '',
      "Location": candidate.location || '',
      "Current Designation": candidate.currentDesignation || '',
      "Current Organization": candidate.currentOrganization || '',
      "Contact Details": candidate.contactDetails || '',
      "Email ID": candidate.email || '',
      "Higher Qualification": candidate.higherQualification || '',
      "Exp CTC": candidate.expectedCTC || '',
      "Diploma Part / Full": candidate.diplomaDetails || '',
      "Graduation %": candidate.graduationPercentage || '',
      "Graduation Year": candidate.graduationYear || '',
      "12th Passing Year": candidate.twelfthPassingYear || '',
      "12th %": candidate.twelfthPercentage || '',
      "10th Pass Year": candidate.tenthPassingYear || '',
      "10th %": candidate.tenthPercentage || '',
      "Date of Birth": candidate.dob || '',
      "AGE": candidate.age || '',
      "Notice Period": candidate.noticePeriod || '',
      "Remarks": candidate.remarks || '',
      "Source": candidate.source || ''
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

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
          <thead>
  <tr>
    <th className="border-bottom">Select</th>
    <th className="border-bottom">S.NO</th>
    <th className="border-bottom">Date Sourced/ Profile Received</th>
    <th className="border-bottom">Profile/Role</th>
    <th className="border-bottom">Candidate Name</th>
    <th className="border-bottom">Years of exp</th>
    <th className="border-bottom">Current CTC</th>
    <th className="border-bottom">Location</th>
    <th className="border-bottom">Current Designation</th>
    <th className="border-bottom">Current Organization</th>
    <th className="border-bottom">Contact Details</th>
    <th className="border-bottom">Email ID</th>
    <th className="border-bottom">Higher Qualification</th>
    <th className="border-bottom">Exp CTC</th>
    <th className="border-bottom">Diploma Part / Full</th>
    <th className="border-bottom">Graduation %</th>
    <th className="border-bottom">Graduation Year</th>
    <th className="border-bottom">12th Passing Year</th>
    <th className="border-bottom">12th %</th>
    <th className="border-bottom">10th Pass Year</th>
    <th className="border-bottom">10th %</th>
    <th className="border-bottom">Date of Birth</th>
    <th className="border-bottom">AGE</th>
    <th className="border-bottom">Notice Period</th>
    <th className="border-bottom">Remarks</th>
    <th className="border-bottom">Source</th>
  </tr>
</thead>
<tbody>
  {filteredCandidates.map((candidate, idx) => (
    <tr key={candidate._id}>
      <td className="border-bottom">
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
      <td className="border-bottom">{idx + 1}</td>
      <td className="border-bottom">{candidate.dateSourced}</td>
      <td className="border-bottom">{vacancy?.role}</td>
      <td className="border-bottom">{candidate.name}</td>
      <td className="border-bottom">{candidate.yearsOfExperience}</td>
      <td className="border-bottom">{candidate.currentCTC}</td>
      <td className="border-bottom">{candidate.location}</td>
      <td className="border-bottom">{candidate.currentDesignation}</td>
      <td className="border-bottom">{candidate.currentOrganization}</td>
      <td className="border-bottom">{candidate.contactDetails}</td>
      <td className="border-bottom">{candidate.email}</td>
      <td className="border-bottom">{candidate.higherQualification}</td>
      <td className="border-bottom">{candidate.expectedCTC}</td>
      <td className="border-bottom">{candidate.diplomaDetails}</td>
      <td className="border-bottom">{candidate.graduationPercentage}</td>
      <td className="border-bottom">{candidate.graduationYear}</td>
      <td className="border-bottom">{candidate.twelfthPassingYear}</td>
      <td className="border-bottom">{candidate.twelfthPercentage}</td>
      <td className="border-bottom">{candidate.tenthPassingYear}</td>
      <td className="border-bottom">{candidate.tenthPercentage}</td>
      <td className="border-bottom">{candidate.dob}</td>
      <td className="border-bottom">{candidate.age}</td>
      <td className="border-bottom">{candidate.noticePeriod}</td>
      <td className="border-bottom">{candidate.remarks}</td>
      <td className="border-bottom">{candidate.source}</td>
    </tr>
  ))}
</tbody>

          </Table>
        </Card.Body>
      </Card>
    </>
  );
}
