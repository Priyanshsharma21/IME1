import React from 'react'
import classNames from '../styles/mindset.module.css'
import { Link } from 'react-router-dom'
const BookCard = ({bookDetail}) => {
  return (
    <Link to={`/mind/books/${bookDetail?.id}`}>
    <div className='flex justify-center cursor-pointer mt-16'>
   <div className={classNames.card}>
   
    <div className='flex justify-center flex-col items-start relative'>
        <div className='font-semibold'>Title - {bookDetail.title}</div>
        <div className='font-semibold mt-2'>Author - {bookDetail.author}</div>
        <div className='font-semibold mt-2'>Type - {bookDetail.type}</div>
        <div className='font-semibold mt-2'>Duration - {bookDetail.duration} min</div>
    </div>
  <div className={classNames.card__content}>
    <p className={classNames.card__title}>{bookDetail.title}</p>
    <div className="mt-2">
      <a href={bookDetail.resource} className='text-orange-400'>
          Listen Now
      </a>
    </div>
    <p className={classNames.card__description}>
        {bookDetail.takeaways[0].slice(0,200)}...
    </p>
  </div>
</div>

    </div>
    </Link>
  )
}

export default BookCard