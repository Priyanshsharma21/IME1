import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { cardioData } from '../../constants/const';
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from 'framer-motion';
import classNames from '../../styles/mindset.module.css'
import { LiaHandPointRight } from 'react-icons/lia';
import { Tag } from 'antd';
import moment from 'moment';

const CardioDetails = () => {
    const { id } = useParams();
    const [cardio, setCardio] = useState(null);
    const navigate = useNavigate()
  
    useEffect(() => {
      const cardio = cardioData.find((b) => b.id === id);
      setCardio(cardio);
    }, [id]);

    console.log(cardio)
  return (
    <div className='cardioDetails w-full min-h-screen bg-[#2323236d]'>
        <div className="absolute cursor-pointer backbtn top-10" onClick={()=>navigate(-1)}>
        <IoMdArrowRoundBack />
    </div>

    <div className="mt-20">
    <motion.div
        className={classNames.bookTitle}
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
        >
        {cardio && cardio.day} Cardio
    </motion.div>

    <div className="takeaways mt-4">
        <ul>
        {cardio &&
            cardio.exercises_performed
            .map((exercise, index) => (
              <motion.div
               whileInView={{x:[100,0], opacity:[0,1]}}
               transition={{duration:1}} key={index} className={classNames.takeawaysText}>
                <div className="flex">
                <div>
                <LiaHandPointRight className="inline-block mr-2" />
                {exercise.name}--------
                </div>
                <div className=''>
                <Tag color="default">{exercise.timing} seconds</Tag>
                </div>
                </div>
              </motion.div>
            ))}
        </ul>
      </div>

      <div className='takeawaysmini'>
      <motion.div
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
         className='mt-10'
        >
        Duration - <span className='font-semibold'>
        {cardio && cardio.duration} minutes
        </span>
        </motion.div>
      </div>
      <div className='takeawaysmini'>
      <motion.div
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
        >
        Date - <span className="font-semibold">
        {cardio && moment(cardio?.date).format("DD MMMM YYYY")}
        </span>
        </motion.div>
      </div>

      <div className='takeawaysmini'>
      <motion.div
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
        >
        Date - <span className="font-semibold">
        {cardio && cardio?.rest_bw_sets} seconds
        </span>
        </motion.div>
      </div>
    </div>
    </div>
  )
}

export default CardioDetails