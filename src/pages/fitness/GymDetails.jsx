import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { gymWorkoutData } from '../../constants/const';
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from 'framer-motion';
import classNames from '../../styles/mindset.module.css'
import { Table, Tag } from 'antd';
import moment from 'moment';

const GymDetails = () => {
    const { id } = useParams();
    const [gym, setGym] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
      const gd = gymWorkoutData.find(b=>b.id===id)
      setGym(gd);
    }, [id]);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          align : "center"
        },
        {
          title: 'Rest',
          dataIndex: 'rest_bw_sets',
          key: 'rest_bw_sets',
          align : "center"
        },
        {
            title : "Sets information",
            dataIndex : "sets_info",
            key : "sets_info",
            align : "center",
            render : (text, record)=>{
                return (
                    <>
                      <div className='flex justify-between items-center makemetable pb-3'>
                            <div className='flex justify-center flex-col items-center mt-3'>
                                <div>Set Number</div>
                            </div>
                            <div className='flex justify-center flex-col items-center mt-3'>
                                 <div>Total Reps</div>
                            </div>
                            <div className='flex justify-center flex-col items-center mt-3'>
                                <div>Total Weight</div>
                            </div>
                        </div>
                    {record?.sets_info?.map(set=>(
                        <div className='flex justify-between items-center '>
                            <div className='flex justify-center flex-col items-center mt-3'>
                                <div>{set?.set_number}</div>
                            </div>
                            <div className='flex justify-center flex-col items-center mt-3'>
                                 <div>{set?.reps}</div>
                            </div>
                            <div className='flex justify-center flex-col items-center mt-3'>
                                <div>{set?.weight}</div>
                            </div>
                        </div>
                    ))}
                    </>
                )
            }
        }
        
    ];

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
        {gym && gym?.workout_type} Workout
    </motion.div>

    <motion.div
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
         className='flex justify-around mmc mt-5'
        >
        <div className='flex mt-3 text-[14px]'>
            <div>{gym?.duration} Minutes</div>
        </div>
        <div className='flex mt-3 text-[14px]'>
            <div>{moment(gym?.date).format("DD MMMM YYYY")}</div>
        </div>
        <div className='flex mt-3 text-[14px]'>
            <div>{gym?.day}</div>
        </div>
    </motion.div>


    <motion.div
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
         className='flex justify-around mmc mt-5'
        >
        <Table className='w-full takeaways' dataSource={gym?.exercises_performed} columns={columns} />;
    </motion.div>

    </div>
    </div>
  )
}

export default GymDetails