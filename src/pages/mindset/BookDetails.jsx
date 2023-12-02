import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LiaHandPointRight } from "react-icons/lia";
import { booksAndPodcastData } from '../../constants/const';
import classNames from '../../styles/mindset.module.css'
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from "react-icons/io";
import moment from 'moment'
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const foundBook = booksAndPodcastData.find((b) => b.id === id);
    setBook(foundBook);
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-[#fff6aee6] py-20 bookDetails">
    <div className="absolute cursor-pointer backbtn top-10" onClick={()=>navigate(-1)}>
        <IoMdArrowRoundBack />
    </div>
      <motion.div
        className={classNames.bookTitle}
         whileInView={{x:[-100,0], opacity:[0,1]}}
         transition={{duration:0.5}}
        >
        {book && book.title}
        </motion.div>
      <div className="takeaways mt-4">
        <ul>
          {book &&
            book.takeaways.map((takeaway, index) => (
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
               transition={{duration:1}} className="learningBy flex justify-start takeaways mt-4 btnText">
        Learning By - {book && book.author}
      </motion.div>
      
      <motion.div  whileInView={{x:[100,0], opacity:[0,1]}}
               transition={{duration:1}} className="learningBy make_me_up flex justify-start takeaways btnText">
        Learning Date - {book && moment(book?.date).format("DD MMM YYYY")}
      </motion.div>

      <div className='mt-10 takeaways'>
      <a
        className="bg-[#fff6aee6] border border-black text-black flex justify-center hover:bg-[#23232324] font-bold py-2 px-4 rounded mt-4 uppercase btnText"
        href={book?.resource}
        target='_blank'
      >
        {book?.way} this {book?.type} Now
      </a>
      </div>
    </div>
  );
};

export default BookDetails;
