import React from 'react'
import classNames from '../styles/mindset.module.css'
import moment from 'moment'
import { Link } from 'react-router-dom'

const CardioCard = ({cardioData}) => {
  return (
    <Link className='hover:text-[#282828] mt-10' to={`/body/workout/cardio/${cardioData?.id}`}>
    <div className={classNames.containerCardio}>
  <div className={classNames.boxCardio}>
    <span className={classNames.titleCardio}>{cardioData.day} Cardio</span>
    <div>
      <strong>{cardioData.day} Cardio</strong>
      <p>{moment(cardioData.date).format("DD-MMM-YY")}</p>
      <span>Duration</span> <span>{cardioData.duration}</span>
    </div>
  </div>
</div>

    </Link>
  )
}

export default CardioCard