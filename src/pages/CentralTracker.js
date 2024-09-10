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
      'Sr. NO': idx + 1, // Serial Number
    'Consultant Name': candidate.consultantName || '', // Consultant Name
    'Name Of Candidate': candidate.name || '', // Name Of Candidate
    'Phone No': candidate.mobile || '', // Phone No
    'Location': candidate.jobLocation || '', // Location
    'Qualification': candidate.highestQualification || '', // Qualification
    'Last Company Name': candidate.lastCompanyName || '', // Last Company Name
    'Industry': candidate.industry || '', // Industry
    'Experience': candidate.experience || '', // Experience
    'Remark': candidate.remark || '', // Remark
    'DOB': candidate.dob || '', // Date of Birth
    'Age': candidate.age || '', // Age (calculate if needed)
    'Gender': candidate.gender || '', // Gender
    'Mail ID': candidate.email || '', // Mail ID
    'Qualification Percentage': candidate.qualificationPercentage || '', // Qualification Percentage
    'Hsc Year': candidate.twelfthPassingYear || '', // Hsc Year
    'Hsc Percentage': candidate.twelfthPercentage || '', // Hsc Percentage
    'SSc Year': candidate.tenthPassingYear || '', // SSc Year
    'SSc Percentage': candidate.tenthPercentage || '', // SSc Percentage
    'Is CTC informed and okay?': candidate.ctcInformed ? 'Yes' : 'No', // Is CTC informed and okay?
    'Is off-roll nature of job okay with candidate?': candidate.offRollNature ? 'Yes' : 'No', // Is off-roll nature of job okay with candidate?
    'Is the on-roll opportunity explained with 18 months clause?': candidate.onRollOpportunityExplained ? 'Yes' : 'No', // Is the on-roll opportunity explained with 18 months clause?
    'Do they have two wheeler and two wheeler license': candidate.twoWheelerAvailable ? 'Yes' : 'No', // Do they have two wheeler and two wheeler license
    'Communication skills rate by scale of 10': candidate.communicationSkillsRate || '', // Communication skills rate by scale of 10
    }));
  }, [selectedCandidates, filteredCandidates, vacancy]);

//   const csvData = filteredCandidates?.map((candidate, idx) => ({
//     'Sr. NO': idx + 1, // Serial Number
//     'Consultant Name': candidate.consultantName || '', // Consultant Name
//     'Name Of Candidate': candidate.name || '', // Name Of Candidate
//     'Phone No': candidate.mobile || '', // Phone No
//     'Location': candidate.jobLocation || '', // Location
//     'Qualification': candidate.highestQualification || '', // Qualification
//     'Last Company Name': candidate.lastCompanyName || '', // Last Company Name
//     'Industry': candidate.industry || '', // Industry
//     'Experience': candidate.experience || '', // Experience
//     'Remark': candidate.remark || '', // Remark
//     'DOB': candidate.dob || '', // Date of Birth
//     'Age': candidate.age || '', // Age (calculate if needed)
//     'Gender': candidate.gender || '', // Gender
//     'Mail ID': candidate.email || '', // Mail ID
//     'Qualification Percentage': candidate.qualificationPercentage || '', // Qualification Percentage
//     'Hsc Year': candidate.twelfthPassingYear || '', // Hsc Year
//     'Hsc Percentage': candidate.twelfthPercentage || '', // Hsc Percentage
//     'SSc Year': candidate.tenthPassingYear || '', // SSc Year
//     'SSc Percentage': candidate.tenthPercentage || '', // SSc Percentage
//     'Is CTC informed and okay?': candidate.ctcInformed ? 'Yes' : 'No', // Is CTC informed and okay?
//     'Is off-roll nature of job okay with candidate?': candidate.offRollNature ? 'Yes' : 'No', // Is off-roll nature of job okay with candidate?
//     'Is the on-roll opportunity explained with 18 months clause?': candidate.onRollOpportunityExplained ? 'Yes' : 'No', // Is the on-roll opportunity explained with 18 months clause?
//     'Do they have two wheeler and two wheeler license': candidate.twoWheelerAvailable ? 'Yes' : 'No', // Do they have two wheeler and two wheeler license
//     'Communication skills rate by scale of 10': candidate.communicationSkillsRate || '', // Communication skills rate by scale of 10
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
               
                <th className="border-bottom">Phone No</th>
                <th className="border-bottom">Location</th>
                <th className="border-bottom">Qualification </th>
                <th className="border-bottom">Last Company Name</th>
                <th className="border-bottom">Industry</th>
                <th className="border-bottom">Experience</th>
                <th className="border-bottom">Remark</th>
                 <th className="border-bottom">DOB</th>
                <th className="border-bottom">Age</th>
                <th className="border-bottom">Gender</th>
                <th className="border-bottom">Mail ID</th>

                <th className="border-bottom">Qualification </th>
                <th className="border-bottom">Percentage</th>

                <th className="border-bottom">Hsc Year</th>
                <th className="border-bottom">Percentage</th>
                <th className="border-bottom">SSc Year</th>
                <th className="border-bottom">Percentage</th>
                <th className="border-bottom"> Is CTC informed and okay? </th>
                <th className="border-bottom"> Is off-roll nature of job okay with candidate? 
                 </th>
                <th className="border-bottom"> Is the on-roll opportunity explained with 18 months clause? </th>
                <th className="border-bottom"> Do they have two wheeler and two wheeler license </th>
                
                
              
                <th className="border-bottom"> Communication skillsrate by scale of 10  </th>
                          
                
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
                  <td className="border-bottom">{candidate.mobile}</td>
                  <td className="border-bottom">{candidate.jobLocation}</td>
                  <td className="border-bottom">{candidate.highestQualification}</td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom">{candidate.dob}</td>
                  <td className="border-bottom"></td>
                  <td className="border-bottom">{candidate.gender}</td>
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
                  <td className="border-bottom">{candidate.twoWheelerAvailable}</td>
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
  