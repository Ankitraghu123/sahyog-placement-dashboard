import React from 'react'
import { useSelector } from 'react-redux';
import TodaysInterview from '../TodaysInterview';

const TodayTotalInterviews = () => {
    const allVacancies = useSelector(state => state.vacancy?.allVacancies);
  return (
    <TodaysInterview vacancyListState={allVacancies}/>
  )
}

export default TodayTotalInterviews