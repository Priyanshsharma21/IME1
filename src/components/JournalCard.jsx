import React from 'react'
import { Link } from 'react-router-dom'
import classNames from '../styles/mindset.module.css'
import moment from "moment"


const JournalCard = ({journalData}) => {
  return (
    <Link className="hover:text-white" to={`/mind/journal/${journalData?.id}`}>
        <div className={classNames.card3}>
        <div className={classNames.containerCardio}>
           <div className={classNames.boxCardio}>
           <span className={classNames.titleCardio}>{journalData.title}</span>
            <div>
               <p>{moment(journalData?.date).format("DD-MMM-YY")}</p>
               <span>Duration</span> <span> {moment(journalData?.date).format("dddd")}</span>
               </div>
             </div>
             <div className={classNames.blob3}></div>
            <div className={classNames.blob3}></div>
            <div className={classNames.blob3}></div>
            <div className={classNames.blob3}></div>
           </div>
           
        </div>
    </Link>
  )
}

export default JournalCard


