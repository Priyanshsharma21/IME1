import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LiaHandPointRight } from "react-icons/lia";
import { journalLearning } from '../../constants/const';
import classNames from '../../styles/mindset.module.css'
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from "react-icons/io";
import moment from 'moment'


const Takeaways = ({journal, takeaways, title})=>{
    return (
        <div className="takeaways mt-4">

        <motion.div
        className="font-semibold"
        whileInView={{x:[-100,0], opacity:[0,1]}}
        transition={{duration:0.5}}
        >
        Todays {title}
        </motion.div>
        <ul>
        {journal &&
        journal[takeaways].map((takeaway, index) => (
        <motion.div
        whileInView={{x:[100,0], opacity:[0,1]}}
        transition={{duration:1}} key={index} className={classNames.takeawaysText}>
            <LiaHandPointRight className="inline-block mr-2" />
            {takeaway}
        </motion.div>
        ))}
        </ul>
    </div>
    )
}
const JournalDetails = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const foundJournal = journalLearning.find((b) => b.id === id);
    setJournal(foundJournal);
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
        {journal && journal.title}
        </motion.div>

        <Takeaways journal={journal} takeaways={"takeaways"} title="Takeaways"/>
        <Takeaways journal={journal} takeaways={"positives"} title="Positives"/>
        <Takeaways journal={journal} takeaways={"negative"} title="Positives"/>
        <Takeaways journal={journal} takeaways={"learning"} title="Learning"/>
        <Takeaways journal={journal} takeaways={"actions"} title="Actions"/>
      
      <motion.div  whileInView={{x:[100,0], opacity:[0,1]}}
               transition={{duration:1}} className="learningBy make_me_up flex justify-start takeaways btnText">
        <span className="font-semibold">
        {journal && moment(journal?.date).format("DD MMM YYYY - dddd")}
        </span>
      </motion.div>

      <div className='mt-10 takeaways'>
      {journal?.resources_gather.map(res=>(
        <a
        className="bg-[#e5aeffe6] border border-black text-black flex justify-center hover:bg-[#23232324] font-bold py-2 px-4 rounded mt-4 uppercase btnText"
        href={res.url}
        target='_blank'
      >
       {res.title}
      </a>
      ))}
      
      </div>
    </div>
  );
};

export default JournalDetails;
