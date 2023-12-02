import { Row, Col, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { booksAndPodcastData, monthsArray, weeksArray } from '../../constants/const.js';
import moment from 'moment'
import BookCard from '../../components/BookCard.jsx';
import { booksAggregatedData } from '../../utils/index.js';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const { Option } = Select;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((entry, index) => (
         <div className='tooltipMain'>
          <p>Date - {`${moment(entry.payload.date).format("DD MMM YY")}`}</p>
          {typeof(entry.payload.title) === 'object' ? (
            entry.payload.title.map((title,i)=>(
              <p key={index}>Title{i+1} - {`${title}`}</p>
            ))
          ):(
            <p key={index}>Title - {`${entry.payload.title}`}</p>
          )}
          <p key={index}>Duration - {`${entry.value} minutes`}</p>
         </div>
        ))}
      </div>
    );
  }

  return null;
};

const Books = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [data, setData] = useState(1);


  useEffect(()=>{
    setData(booksAggregatedData(booksAndPodcastData))
  },[])

  useEffect(()=>{
    const filteredBooks = booksAndPodcastData.filter((book)=>{
      const bookYear = moment(book.date).format("YYYY")
      const bookMonth = moment(book.date).format("MMMM")
      const bookWeek = book.week_number

      if(bookYear == selectedYear && bookMonth == selectedMonth && bookWeek == selectedWeek){
        return book
      }
    })

    setData(booksAggregatedData(filteredBooks))

  },[selectedYear, selectedMonth, selectedWeek])

  const years = [2023, 2024];

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  return (
    <>
    <div className="books w-full min-h-screen">
    <div className="absolute cursor-pointer backbtn top-10" onClick={()=>navigate(-1)}>
        <IoMdArrowRoundBack />
    </div>
    <div className='font-semibold mt-20 heading w-full flex justify-center'>Analytics</div>
    <div className="filters mt-5 mb-4 ml-4">
                <Select value={selectedYear} onChange={handleYearChange}>
                  {years.map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
                <Select value={selectedMonth} onChange={handleMonthChange} className='ml-2'>
                  <Option value="">All Months</Option>
                  {monthsArray.map((month) => (
                    <Option key={month.monthNumber} value={month.monthName}>
                      {month.monthName}
                    </Option>
                  ))}
                </Select>
                <Select value={selectedWeek} onChange={handleWeekChange} className='ml-2'>
                  <Option value="">All Weeks</Option>
                  {weeksArray.map((week) => (
                    <Option key={week.weekNumber} value={week.weekNumber}>
                      {week.weekLabel}
                    </Option>
                  ))}
                </Select>
              </div>
      <Row>
        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
          <div className="w-full h-full mt-10 pr-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="duration" fill="#282828" activeBar={<Rectangle fill="#bae594f3" stroke="black" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>

        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
        <div className="w-full h-full mt-10 pr-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="duration" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
        </Col>
      </Row>
      <div className='mt-40 w-full pb-10'>
        <div className='font-semibold heading w-full flex justify-center'>Books & Podcasts</div>
      <Row>
        {booksAndPodcastData.map(item=>(
            <Col xl={6} lg={8} md={12} sm={24} xs={24} className="bookRow">
              <BookCard bookDetail={item}/>
            </Col>
        ))}
      </Row>
    </div>
    </div>

   
    </>
  );
};

export default Books;
