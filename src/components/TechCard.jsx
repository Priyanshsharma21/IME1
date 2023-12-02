import React from 'react'
import { Link } from 'react-router-dom'
import classNames from '../styles/mindset.module.css'

const TechCard = ({techDetails}) => {
  return (
    <Link to={`/mind/tech/${techDetails.id}`}>
       <div className={classNames.card_container}>
        <div className={classNames.card_tech}>
        <div className={classNames.front_content}>
            <p>{techDetails.title}</p>
        </div>
        <div className={classNames.content_tech}>
            <p className={classNames.heading_techs}>{techDetails.title}</p>
            <p>
            {techDetails.takeaways[0].slice(0,200)}...
            </p>
        </div>
        </div>
        </div>
    </Link>
  )
}

export default TechCard



