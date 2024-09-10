import React, { useEffect, useState, useMemo } from 'react';
import { Card, Form, Table } from '@themesberg/react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleVacancies } from '../features/vacancy/vacancySlice';
import { CSVLink } from 'react-csv';

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const candidateListState = useSelector((state) => state?.candidate?.shortListedCandidateByJob) || [];
  const vacancy = useSelector((state) => state.vacancy?.singleVacancy);

  // Default to empty array if undefined
  const filteredCandidates = candidateListState?.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  useEffect(() => {
    dispatch(getSingleVacancies(id));
  }, [dispatch, id]);

  // Memoize csvData to prevent unnecessary recalculations
  const csvData = useMemo(() => {
    const candidatesToExport = selectedCandidates.length > 0 ? selectedCandidates : filteredCandidates;
    if (!candidatesToExport || candidatesToExport.length === 0) return [];
    
    return candidatesToExport.map((candidate, idx) => ({
      SNO: idx + 1,
      Role: vacancy?.role || '',
      RoleLocation: vacancy?.jobLocation || '',
      CandidateName: candidate.name || '',
      MobileNo: candidate.mobile || '',
      EmailID: candidate.email || '',
      DOB: candidate.dob || '',
      Gender: candidate.gender || '',
      CandidateLocation: candidate.city || '',
      State: candidate.state || '',
      TwoWheeler: candidate.twoWheelerAvailable ? 'Yes' : 'No',
      '10%': candidate.tenthPercentage || '',
      '10thPassingYear': candidate.tenthPassingYear || '',
      '12%': candidate.twelfthPercentage || '',
      '12thPassingYear': candidate.twelfthPassingYear || '',
      GraduationPercentage: candidate.gradPercentage || '',
      GraduationPassingYear: candidate.gradPassingYear || '',
      PostGraduationPercentage: candidate.postGradPercentage || '',
      PostGraduationPassingYear: candidate.postGradPassingYear || '',
      TotalExperience: candidate.totalExperience || '',
      CurrentCtc: candidate.currentCTC || '',
      JobProfileExplained: candidate.jobProfileExplained ? 'Yes' : 'No',
      CTCInformed: candidate.ctcInformed ? 'Yes' : 'No',
      ConsultantName: candidate.consultantName || '',
      Remark: candidate.remark || ''
    }));
  }, [selectedCandidates, filteredCandidates, vacancy]);

  // Log CSV data to check its format
  // console.log('CSV Data:', csvData);

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
                <th className="border-bottom">Role</th>
                <th className="border-bottom">Role Location</th>
                <th className="border-bottom">Candidate Name</th>
                <th className="border-bottom">Mobile No</th>
                <th className="border-bottom">Email ID</th>
                <th className="border-bottom">DOB</th>
                <th className="border-bottom">Gender</th>
                <th className="border-bottom">Candidate Location</th>
                <th className="border-bottom">State</th>
                <th className="border-bottom">Two Wheeler(Y/N)</th>
                <th className="border-bottom">10%</th>
                <th className="border-bottom">10th Passing Year</th>
                <th className="border-bottom">12%</th>
                <th className="border-bottom">12th Passing Year</th>
                <th className="border-bottom">Graduation %</th>
                <th className="border-bottom">Graduation Passing Year</th>
                <th className="border-bottom">Post Graduation %</th>
                <th className="border-bottom">Post Graduation Passing Year</th>
                <th className="border-bottom">Total Experience</th>
                <th className="border-bottom">Current CTC</th>
                <th className="border-bottom">Job Profile Explained</th>
                <th className="border-bottom">CTC Informed</th>
                <th className="border-bottom">Consultant Name</th>
                <th className="border-bottom">Remark</th>
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
                  <td className="border-bottom">{vacancy?.role}</td>
                  <td className="border-bottom">{vacancy?.jobLocation}</td>
                  <td className="border-bottom">{candidate.name}</td>
                  <td className="border-bottom">{candidate.mobile}</td>
                  <td className="border-bottom">{candidate.email}</td>
                  <td className="border-bottom">{candidate.dob}</td>
                  <td className="border-bottom">{candidate.gender}</td>
                  <td className="border-bottom">{candidate.city}</td>
                  <td className="border-bottom">{candidate.state}</td>
                  <td className="border-bottom">{candidate.twoWheelerAvailable ? 'Yes' : 'No'}</td>
                  <td className="border-bottom">{candidate.tenthPercentage}</td>
                  <td className="border-bottom">{candidate.tenthPassingYear}</td>
                  <td className="border-bottom">{candidate.twelfthPercentage}</td>
                  <td className="border-bottom">{candidate.twelfthPassingYear}</td>
                  <td className="border-bottom">{candidate.gradPercentage}</td>
                  <td className="border-bottom">{candidate.gradPassingYear}</td>
                  <td className="border-bottom">{candidate.postGradPercentage}</td>
                  <td className="border-bottom">{candidate.postGradPassingYear}</td>
                  <td className="border-bottom">{candidate.totalExperience}</td>
                  <td className="border-bottom">{candidate.currentCTC}</td>
                  <td className="border-bottom">{candidate.jobProfileExplained ? 'Yes' : 'No'}</td>
                  <td className="border-bottom">{candidate.ctcInformed ? 'Yes' : 'No'}</td>
                  <td className="border-bottom">{candidate.consultantName}</td>
                  <td className="border-bottom">{candidate.remark}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
