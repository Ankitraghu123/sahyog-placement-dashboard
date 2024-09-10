import React, { useEffect, useMemo, useState } from 'react'
import { Card, Col, Form, Table } from '@themesberg/react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleVacancies } from '../features/vacancy/vacancySlice';
import { CSVLink } from 'react-csv';

export default () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [statusFilter, setStatusFilter] = useState(''); // State for status filter
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const candidateListState = useSelector(state => state?.candidate?.shortListedCandidateByJob);
    const vacancy = useSelector(state => state.vacancy?.singleVacancy)
    
    const totalCandidates = candidateListState?.length;

  const filteredCandidates = candidateListState?.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || candidate.status === statusFilter)
  );

  useEffect(()=>{
    dispatch(getSingleVacancies(id))
  },[])

  const csvData = useMemo(() => {
    const candidatesToExport = selectedCandidates.length > 0 ? selectedCandidates : filteredCandidates;
    if (!candidatesToExport || candidatesToExport.length === 0) return [];
    
    return candidatesToExport.map((candidate, idx) => ({
      SNO: idx + 1,
      ConsultantName: candidate.consultantName || '', // Consultant Name
      CandidateName: candidate.name || '', // Name of Candidate
      DOB: candidate.dob || '', // DOB
      Age: candidate.age || '', // Age, calculate if not directly available
      Gender: candidate.gender || '', // Gender
      PhoneNo: candidate.mobile || '', // Phone No
      EmailID: candidate.email || '', // Mail ID
      QualificationYear: candidate.highestQualificationYear || '', // Qualification (last degree) year
      QualificationPercentage: candidate.highestQualificationPercentage || '', // Percentage for Qualification
      HscYear: candidate.twelfthPassingYear || '', // Hsc Year
      HscPercentage: candidate.twelfthPercentage || '', // Percentage for Hsc
      SscYear: candidate.tenthPassingYear || '', // SSc Year
      SscPercentage: candidate.tenthPercentage || '', // Percentage for SSc
      "Is job profile explained and okay with candidate? ": candidate.jobProfileExplained ? 'Yes' : 'No', // Is job profile explained and okay with candidate?
     "Is CTC informed and okay? ": candidate.ctcInformed ? 'Yes' : 'No', // Is CTC informed and okay?
      "Is off-roll nature of job okay with candidate? ": candidate.onRollOpportunityExplained ? 'Yes' : 'No', // Is the on-roll opportunity explained with 18 months clause?
      "Is the on-roll opportunity explained with 18 months clause? ": candidate.onRollOpportunityExplained ? 'Yes' : 'No',
      CommunicationSkills: candidate.communicationSkills || '', // Communication skills
      "Qualitative Feedback On Candidate": candidate.qualitativeFeedback || '', // Qualitative feedback on candidate
      Remark: candidate.remark || '' // Remark
    }));
  }, [selectedCandidates, filteredCandidates, vacancy]);

//   const csvData = filteredCandidates?.map((candidate, idx) => ({
//     SNO: idx + 1,
//     ConsultantName: candidate.consultantName || '', // Consultant Name
//     CandidateName: candidate.name || '', // Name of Candidate
//     DOB: candidate.dob || '', // DOB
//     Age: candidate.age || '', // Age, calculate if not directly available
//     Gender: candidate.gender || '', // Gender
//     PhoneNo: candidate.mobile || '', // Phone No
//     EmailID: candidate.email || '', // Mail ID
//     QualificationYear: candidate.highestQualificationYear || '', // Qualification (last degree) year
//     QualificationPercentage: candidate.highestQualificationPercentage || '', // Percentage for Qualification
//     HscYear: candidate.twelfthPassingYear || '', // Hsc Year
//     HscPercentage: candidate.twelfthPercentage || '', // Percentage for Hsc
//     SscYear: candidate.tenthPassingYear || '', // SSc Year
//     SscPercentage: candidate.tenthPercentage || '', // Percentage for SSc
//     "Is job profile explained and okay with candidate? ": candidate.jobProfileExplained ? 'Yes' : 'No', // Is job profile explained and okay with candidate?
//    "Is CTC informed and okay? ": candidate.ctcInformed ? 'Yes' : 'No', // Is CTC informed and okay?
//     "Is off-roll nature of job okay with candidate? ": candidate.onRollOpportunityExplained ? 'Yes' : 'No', // Is the on-roll opportunity explained with 18 months clause?
//     "Is the on-roll opportunity explained with 18 months clause? ": candidate.onRollOpportunityExplained ? 'Yes' : 'No',
//     CommunicationSkills: candidate.communicationSkills || '', // Communication skills
//     "Qualitative Feedback On Candidate": candidate.qualitativeFeedback || '', // Qualitative feedback on candidate
//     Remark: candidate.remark || '' // Remark
// }));

  

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
                <th className="border-bottom">Sr.NO</th>
                <th className="border-bottom">Consultant Name</th>
                <th className="border-bottom">Name Of Candidate</th>
                <th className="border-bottom">DOB</th>
                <th className="border-bottom">Age</th>
                <th className="border-bottom">Gender</th>
                <th className="border-bottom">Phone No</th>
                <th className="border-bottom">Mail ID</th>
                <th className="border-bottom">Qualification (last degree) year</th>
                <th className="border-bottom">Percentage</th>
                <th className="border-bottom">Hsc Year</th>
                <th className="border-bottom">Percentage</th>
                <th className="border-bottom">SSc Year</th>
                <th className="border-bottom">Percentage</th>
                <th className="border-bottom"> Is job profile explained and okay with candidate? </th>
                <th className="border-bottom"> Is CTC informed and okay? </th>
                <th className="border-bottom"> Is the on-roll opportunity explained with 18 months clause? </th>
                <th className="border-bottom"> Communication skills  </th>
                <th className="border-bottom"> Qualitative feedback on candidate 
                 </th>            
                <th className="border-bottom">Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates?.map((candidate, idx) => (
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
                  <td className="border-bottom"></td> 
                  <td className="border-bottom">
                  {candidate.name}
                    {/* <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link> */}
                  </td>
                  <td className="border-bottom">{candidate.dob}</td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom">{candidate.gender}</td>
                  <td className="border-bottom">{candidate.mobile}</td>
                  <td className="border-bottom">{candidate.email}</td>
                  <td className="border-bottom">{candidate.highestQualification}</td>
                  <td className="border-bottom"></td>
                 
                 
                  <td className="border-bottom">{candidate.tenthPercentage}</td>
                  <td className="border-bottom">{candidate.tenthPassingYear}</td>
                  <td className="border-bottom">{candidate.twelfthPercentage}</td>
                  <td className="border-bottom">{candidate.twelfthPassingYear}</td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                </tr>
              ))}
            </tbody>
          </Table>
       
        </Card.Body>
      </Card>

      {/* Select Vacancy and Apply Button */}
    </>
  );
};
  