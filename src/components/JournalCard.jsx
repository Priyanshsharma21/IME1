import React from 'react'
import { Link } from 'react-router-dom'
import classNames from '../styles/mindset.module.css'
import moment from "moment"


const JournalCard = ({journalData}) => {
  return (
    <Link to={`/mind/journal/${journalData?.id}`}>
        <div className={classNames.card3}>
            <div className={classNames.card__content3}>
                <div className="flex w-full h-full justify-center items-center flex-col">
                <div className="flex justify-center">
                    {moment(journalData?.date).format("DD-MMM-YY")}
                </div>
                <div className="flex mt-2 justify-center text-slate-600">
                    {moment(journalData?.date).format("dddd")}
                </div>
                <div className="flex mt-2 justify-center text-[1rem] font-semibold ">{journalData.title}</div>
                </div>
            </div>
            <div className={classNames.blob3}></div>
            <div className={classNames.blob3}></div>
            <div className={classNames.blob3}></div>
            <div className={classNames.blob3}></div>
        </div>
    </Link>
  )
}

export default JournalCard