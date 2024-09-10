import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Card, Table } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { candidateList } from '../features/candidate/candidateSlice';

export default () => {
    const [searchNumber, setSearchNumber] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search') || '';

    useEffect(() => {
        dispatch(candidateList())
        setSearchNumber(searchParam);
    }, [searchParam]);


    const candidateListState = useSelector(state => state?.candidate?.candidatelist);

    // Filter candidates based on the number from query parameter
    const filteredCandidates = candidateListState?.filter(candidate =>
        candidate.mobile.includes(searchNumber) // Assuming 'number' is a field in your candidate data
    );

    useEffect(()=>{
        if(filteredCandidates?.length === 0){
            history.push('/add-candidate')
        }
    },[filteredCandidates])

    console.log(filteredCandidates)

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">S.NO</th>
                                <th className="border-bottom">Candidate Name</th>
                                <th className="border-bottom">Mobile</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom"><FontAwesomeIcon icon={faEdit} /></th>
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
                                    <td className="border-bottom">{candidate.status}</td>
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
