import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LiaHandPointRight } from "react-icons/lia";
import { techLearningData } from '../../constants/const';
import classNames from '../../styles/mindset.module.css'
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from "react-icons/io";
import moment from 'moment'

const TechDetails = () => {
  const { id } = useParams();
  const [tech, setTech] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const foundTech = techLearningData.find((b) => b.id === id);
    setTech(foundTech);
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-[#e5aeffe6] py-20 bookDetails">
    <div className="absolute cursor-pointer backbtn top-10" onClick={()=>navigate(-1)}>
        <IoMdArrowRoundBack />
    </div>
      <motion.div
        className={classNames.bookTitle}
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
        >
        {tech && tech.title}
        </motion.div>
      <div className="takeaways mt-4">
        <ul>
          {tech &&
            tech.takeaways.map((takeaway, index) => (
              <motion.div
               whileInView={{x:[100,0], opacity:[0,1]}}
               transition={{duration:1}} key={index} className={classNames.takeawaysText}>
                <LiaHandPointRight className="inline-block mr-2" />
                {takeaway}
              </motion.div>
            ))}
        </ul>
      </div>

      <motion.div  whileInView={{x:[100,0], opacity:[0,1]}}
               transition={{duration:1}} className="learningBy make_me_up flex justify-start takeaways btnText">
        <span className="font-semibold">
        {tech && moment(tech?.date).format("DD MMM YYYY")}
        </span>
      </motion.div>

      <div className='mt-10 takeaways'>
      {tech?.resources.map(res=>(
        <a
        className="bg-[#e5aeffe6] border border-black text-black flex justify-center hover:bg-[#23232324] font-bold py-2 px-4 rounded mt-4 uppercase btnText"
        href={res}
        target='_blank'
      >
        Read More
      </a>
      ))}
      
      </div>
    </div>
  );
};

export default TechDetails;
