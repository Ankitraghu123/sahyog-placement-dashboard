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
    if (!candidatesToExport || candidatesToExport.length === 0) return [];
    
    return candidatesToExport.map((candidate, idx) => ({
      // SNO: idx + 1,
      "ConsultantName":'Sahyog job and multi work solutions', // Consultant Name
      "Candidate Name": candidate.name || '', // Name of Candidate
      DOB:candidate.dob ? formatDate(candidate.dob) : '', // DOB
      Age: candidate.dob ? calculateAge(candidate.dob) :'', // Age, calculate if not directly available
      Gender: candidate.gender || '', // Gender
      PhoneNo: candidate.mobile || '', // Phone No
      EmailID: candidate.email || '', // Mail ID
      QualificationYear: candidate.postGradSubject ? `Post Graduation- ${candidate.postGradSubject}- ${candidate.postGradPassingYear} ` : candidate.gradSubject ? `Graduation - ${candidate.gradSubject}- ${candidate.gradPassingYear} ` : 'NA', // Qualification (last degree) year
      QualificationPercentage: candidate.postGradSubject ? ` ${candidate.postGradPercentage} ` : candidate.gradSubject ? `${candidate.gradPercentage} ` : 'NA', // Percentage for Qualification
      HscYear: candidate.twelfthPassingYear || '', // Hsc Year
      HscPercentage: candidate.twelfthPercentage || '', // Percentage for Hsc
      SscYear: candidate.tenthPassingYear || '', // SSc Year
      SscPercentage: candidate.tenthPercentage || '', // Percentage for SSc
      "Is job profile explained and okay with candidate? ": 'Yes', // Is job profile explained and okay with candidate?
     "Is CTC informed and okay? ": 'Yes',
      "Is off-roll nature of job okay with candidate? ": 'Yes',
      "Is the on-roll opportunity explained with 18 months clause? ": 'Yes',
      CommunicationSkills: candidate.communicationSkills || '', // Communication skills
      "Qualitative Feedback On Candidate": candidate.qualitativeFeedback || '', // Qualitative feedback on candidate
      Remark: candidate.remark || '' // Remark
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

      <Card className="table-wrapper table-responsive shadow-sm" style={{ borderColor: '#EE9C8D'}}>
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Select</th>
                {/* <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Sr.NO</th> */}
                <th style={{ borderBottomColor: '#EE9C8D',borderBottomWidth:'2px' }}>Consultant Name</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Name Of Candidate</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>DOB</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Age</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Gender</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Phone No</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Mail ID</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Qualification (last degree) year</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Percentage</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Hsc Year</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Percentage</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>SSc Year</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Percentage</th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}> Is job profile explained and okay with candidate? </th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}> Is CTC informed and okay? </th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}> Is the on-roll opportunity explained with 18 months clause? </th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}> Communication skills  </th>
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}> Qualitative feedback on candidate 
                 </th>            
                <th style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Remark</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates?.map((candidate, idx) => (
                <tr key={candidate._id}>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>
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
                  {/* <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{idx + 1}</td> */}
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Sahyog job and multi work solutions</td> 
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>
                  {candidate.name}
                    {/* <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link> */}
                  </td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{formatDate(candidate.dob)}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{calculateAge(candidate.dob)}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.gender}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.mobile}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.email}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.postGradSubject ? `Post Graduation- ${candidate.postGradSubject}- ${candidate.postGradPassingYear} ` : candidate.gradSubject ? `Graduation - ${candidate.gradSubject}- ${candidate.gradPassingYear} ` : 'NA'}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.postGradPercentage ? candidate.postGradPercentage : 'NA'}</td>
                 
                 
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.tenthPassingYear}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.tenthPercentage}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.twelfthPassingYear}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>{candidate.twelfthPercentage}</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Yes</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Yes</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}>Yes</td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}></td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}></td>
                  <td style={{ borderColor: '#EE9C8D',borderBottomWidth:'2px'}}></td>
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
  