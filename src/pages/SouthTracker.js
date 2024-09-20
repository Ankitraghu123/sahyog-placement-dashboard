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

  // Memoize csvData to prevent unnecessary recalculations
  const csvData = useMemo(() => {
    const candidatesToExport = selectedCandidates.length > 0 ? selectedCandidates : filteredCandidates;
    if (!candidatesToExport || candidatesToExport.length === 0) return [];
    
    return candidatesToExport.map((candidate, idx) => ({
      // SNO: idx + 1,
      Role: vacancy?.role || '',
      RoleLocation: vacancy?.jobLocation || '',
      CandidateName: candidate.name || '',
      MobileNo: candidate.mobile || '',
      EmailID: candidate.email || '',
      DOB: candidate.dob ? formatDate(candidate.dob) : '',
      Gender: candidate.gender || '',
      CandidateLocation: candidate.city || '',
      State: candidate.state || '',
      TwoWheeler: candidate.twoWheelerAvailable == false ? 'No' : 'Yes',
      '10%': candidate.tenthPercentage || '',
      '10thPassingYear': candidate.tenthPassingYear || '',
      '12%': candidate.twelfthPercentage || '',
      '12thPassingYear': candidate.twelfthPassingYear || '',
      GraduationPercentage: candidate.gradPercentage || '',
      GraduationPassingYear:candidate.gradSubject && candidate.gradPassingYear ? `${candidate.gradPassingYear} - ${candidate.gradSubject}` : '',
      PostGraduationPercentage: candidate.postGradPercentage || '',
      PostGraduationPassingYear: candidate.postGradSubject && candidate.postGradradPassingYear ? `${candidate.postGradPassingYear} - ${candidate.postGradSubject}` : '',
      TotalExperience: candidate.totalExperience || '',
      CurrentCtc: candidate.currentCTC || '',
      JobProfileExplained: 'Yes',
      CTCInformed: 'Yes',
      ConsultantName: 'Sahyog job and multi work solutions',
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

      <Card border="light" className="table-wrapper table-responsive shadow-sm border-danger">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom border-danger">Select</th>
                {/* <th className="border-bottom border-danger">S.NO</th> */}
                <th className="border-bottom border-danger">Role</th>
                <th className="border-bottom border-danger">Role Location</th>
                <th className="border-bottom border-danger">Candidate Name</th>
                <th className="border-bottom border-danger">Mobile No</th>
                <th className="border-bottom border-danger">Email ID</th>
                <th className="border-bottom border-danger">DOB</th>
                <th className="border-bottom border-danger">Gender</th>
                <th className="border-bottom border-danger">Candidate Location</th>
                <th className="border-bottom border-danger">State</th>
                <th className="border-bottom border-danger">Two Wheeler(Y/N)</th>
                <th className="border-bottom border-danger">10%</th>
                <th className="border-bottom border-danger">10th Passing Year</th>
                <th className="border-bottom border-danger">12%</th>
                <th className="border-bottom border-danger">12th Passing Year</th>
                <th className="border-bottom border-danger">Graduation %</th>
                <th className="border-bottom border-danger">Graduation Passing Year</th>
                <th className="border-bottom border-danger">Post Graduation %</th>
                <th className="border-bottom border-danger">Post Graduation Passing Year</th>
                <th className="border-bottom border-danger">Total Experience</th>
                <th className="border-bottom border-danger">Current CTC</th>
                <th className="border-bottom border-danger">Job Profile Explained</th>
                <th className="border-bottom border-danger">CTC Informed</th>
                <th className="border-bottom border-danger">Consultant Name</th>
                <th className="border-bottom border-danger">Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, idx) => (
                <tr key={candidate._id} className='border border-danger'>
                  <td className="border-bottom  border-danger">
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
                  <td className="border-bottom border-danger">{vacancy?.role}</td>
                  <td className="border-bottom border-danger">{vacancy?.jobLocation}</td>
                  <td className="border-bottom border-danger">{candidate.name}</td>
                  <td className="border-bottom border-danger">{candidate.mobile}</td>
                  <td className="border-bottom border-danger">{candidate.email}</td>
                  <td className="border-bottom border-danger">{formatDate(candidate.dob)}</td>
                  <td className="border-bottom border-danger">{candidate.gender}</td>
                  <td className="border-bottom border-danger">{candidate.city}</td>
                  <td className="border-bottom border-danger">{candidate.state}</td>
                  <td className="border-bottom border-danger">{candidate.twoWheelerAvailable== false ? 'No' : 'Yes'}</td>
                  <td className="border-bottom border-danger">{candidate.tenthPercentage}</td>
                  <td className="border-bottom border-danger">{candidate.tenthPassingYear}</td>
                  <td className="border-bottom border-danger">{candidate.twelfthPercentage}</td>
                  <td className="border-bottom border-danger">{candidate.twelfthPassingYear}</td>
                  <td className="border-bottom border-danger">{candidate.gradPercentage}</td>
                  <td className="border-bottom border-danger">{candidate.gradPassingYear}-{candidate.gradSubject}</td>
                  <td className="border-bottom border-danger">{candidate.postGradPercentage}</td>
                  <td className="border-bottom border-danger">{candidate.postGradPassingYear}-{candidate.postGradSubject}</td>
                  <td className="border-bottom border-danger">{candidate.totalExperience}</td>
                  <td className="border-bottom border-danger">{candidate.currentCTC}</td>
                  <td className="border-bottom border-danger"> Yes</td>
                  <td className="border-bottom border-danger">Yes</td>
                  <td className="border-bottom border-danger">Sahyog job and multi work solutions</td>
                  <td className="border-bottom border-danger">{candidate.remark}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
