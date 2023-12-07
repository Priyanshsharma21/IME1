import React from 'react'
import classNames from '../styles/mindset.module.css'
import moment from 'moment'
import { Link } from 'react-router-dom'


const GymCard = ({gymData}) => {
  return (
    <Link className='hover:text-[#282828] mt-10' to={`/body/workout/gym/${gymData?.id}`}>
    <div className={classNames.containerCardio}>
  <div className={classNames.boxCardio}>
    <span className={classNames.titleCardio}>{gymData.workout_type}</span>
    <div>
      <strong>{gymData.day}</strong>
      <p>{moment(gymData.date).format("DD-MMM-YY")}</p>
      <span>Duration</span> <span>{gymData.duration} : minutes</span>
    </div>
  </div>
</div>
    </Link>
  )
}

export default GymCard