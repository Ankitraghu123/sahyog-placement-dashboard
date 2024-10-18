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
      // 'Sr. NO': idx + 1, // Serial Number
    'Consultant Name':  'Sahyog job and multi work solutions', // Consultant Name
    'Name Of Candidate': candidate.name || '', // Name Of Candidate
    'Phone No': candidate.mobile || '', // Phone No
    'Location':  candidate.city ? ` ${candidate.city}`: 'NA', // Location
    'Qualification ': candidate.postGradSubject ? `Post Graduation- ${candidate.postGradSubject}- ${candidate.postGradPassingYear} ` : candidate.gradSubject ? `Graduation - ${candidate.gradSubject}- ${candidate.gradPassingYear} ` : 'NA' , // Qualification
    // 'Qualification last degree Percentage': candidate.postGradSubject ? ` ${candidate.postGradPercentage} ` : candidate.gradSubject ? ` ${candidate.gradPercentage} ` : 'NA' , // Qualification
    'Last Company Name': candidate.lastCompanyName || '', // Last Company Name
    'Industry': candidate.industry || '', // Industry
    'Experience': candidate.experience || '', // Experience
    'Remark if any relax in criteria ': candidate.remark || '', // Remark
    'DOB': candidate.dob ? formatDate(candidate.dob) : '', // Date of Birth
    'Age': candidate.dob ? calculateAge(candidate.dob) : '', // Age (calculate if needed)
    'Gender': candidate.gender || '', // Gender
    'Mail ID': candidate.email || '', // Mail ID

    'Qualification last degree': candidate.postGradSubject ? `Post Graduation- ${candidate.postGradSubject}- ${candidate.postGradPassingYear} ` : candidate.gradSubject ? `Graduation - ${candidate.gradSubject}- ${candidate.gradPassingYear} ` : 'NA' ,

     'Qualification last degree Percentage': candidate.postGradSubject ? ` ${candidate.postGradPercentage} ` : candidate.gradSubject ? ` ${candidate.gradPercentage} ` : 'NA' , 

    ' Qualification Second Last Degree':  candidate.postGradSubject ? `Graduation- ${candidate.gradSubject}- ${candidate.gradPassingYear} ` : candidate.gradSubject ? `Twelfth- ${candidate.twelfthSubject}- ${candidate.twelfthPassingYear} ` : 'NA' , 

    'Qualification Last Degree Percentage': candidate.postGradSubject ? ` ${candidate.gradPercentage} ` : candidate.gradSubject ? `${candidate.twelfthPercentage} ` : 'NA' , 

    'Hsc Year': candidate.twelfthPassingYear || '', // Hsc Year
    'Hsc Percentage': candidate.twelfthPercentage || '', // Hsc Percentage
    'SSc Year': candidate.tenthPassingYear || '', // SSc Year
    'SSc Percentage': candidate.tenthPercentage || '', // SSc Percentage
    'Is CTC informed and okay?': 'Yes', // Is CTC informed and okay?
    'Is off-roll nature of job okay with candidate?': 'Yes', // Is off-roll nature of job okay with candidate?
    'Is the on-roll opportunity explained with 18 months clause?': 'Yes', // Is the on-roll opportunity explained with 18 months clause?
    'Do they have two wheeler and two wheeler license': candidate.twoWheelerAvailable == false ? "no" : "yes", // Do they have two wheeler and two wheeler license
    'Communication skills rate by scale of 10': candidate.communicationSkillsRate || '', // Communication skills rate by scale of 10
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

      <Card className="table-wrapper table-responsive shadow-sm" style={{borderColor:'#FFFF6C',borderWidth:'1px'}}>
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
              <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Select</th>
                {/* <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Sr.NO</th> */}
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Consultant Name</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Name Of Candidate</th>
               
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Phone No</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Location</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>highest Qualification </th>
                {/* <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>highest Qualification percentage </th> */}
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Last Company Name</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Industry</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Experience</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Remark</th>
                 <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>DOB</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Age</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Gender</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Mail ID</th>
<th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Qualification Last Degree </th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Percentage</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Qualification Last Degree </th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Qualification Percentage</th>

                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Hsc Year</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Percentage</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>SSc Year</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Percentage</th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Is CTC informed and okay? </th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Is off-roll nature of job okay with candidate? 
                 </th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Is the on-roll opportunity explained with 18 months clause? </th>
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Do they have two wheeler and two wheeler license </th>
                
                
              
                <th style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}> Communication skillsrate by scale of 10  </th>
                          
                
              </tr>
            </thead>
            <tbody>
              {filteredCandidates?.map((candidate, idx) => (

                <tr key={candidate._id}>
                   <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>
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
                  {/* <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{idx + 1}</td> */}
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Sahyog job and multi work solutio</td> 
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>
                  {candidate.name}
                    {/* <Link to={`/candidate-detail/${candidate._id}`}>{candidate.name}</Link> */}
                  </td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.mobile}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.city}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.postGradSubject ? `Post Graduation- ${candidate.postGradSubject}- ${candidate.postGradPassingYear} ` : candidate.gradSubject ? `Graduation - ${candidate.gradSubject} - ${candidate.gradPassingYear}` : 'NA'}</td>
                  {/* <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>
                    {candidate.postGradSubject ? ` ${candidate.postGradPercentage} ` : candidate.gradSubject ? `${candidate.gradPercentage} ` : 'NA'}
                  </td> */}
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}></td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}></td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}></td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}></td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{formatDate(candidate.dob)}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{calculateAge(candidate.dob)}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.gender}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.email}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.postGradSubject ? `Post Graduation- ${candidate.postGradSubject}- ${candidate.postGradPassingYear} ` : candidate.gradSubject ? `Graduation - ${candidate.gradSubject} - ${candidate.gradPassingYear}` : 'NA'}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>
                    {candidate.postGradSubject ? ` ${candidate.postGradPercentage} ` : candidate.gradSubject ? `${candidate.gradPercentage} ` : 'NA'}
                  </td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>
                  {candidate.postGradSubject ? `Graduation- ${candidate.gradSubject} - ${candidate.gradPassingYear} ` : candidate.gradSubject ? `Twelfth- ${candidate.twelfthSubject}- ${candidate.twelfthPassingYear} ` : 'NA'}
                  </td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>
                  {candidate.postGradSubject ? ` ${candidate.gradPercentage} ` : candidate.gradSubject ? ` ${candidate.twelfthPercentage} ` : 'NA'}
                  </td>

                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.twelfthPassingYear}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.twelfthPercentage}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.tenthPassingYear}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.tenthPercentage}</td>
                  
                  
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Yes</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Yes</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>Yes</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}>{candidate.twoWheelerAvailable == false ? "no" : "yes"}</td>
                  <td style={{borderBottomColor:'#FFFF6C',borderBottomWidth:'1px'}}></td>
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
  