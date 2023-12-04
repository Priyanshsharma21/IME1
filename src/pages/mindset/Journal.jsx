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
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { journalLearning, monthsArray, weeksArray } from '../../constants/const.js';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import TechCard from '../../components/TechCard.jsx';
import JournalCard from '../../components/JournalCard.jsx';

const { Option } = Select;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((entry, index) => (
         <div className='tooltipMain'>
          <p>Date - {`${moment(entry.payload.date).format("DD MMM YY")}`}</p>
          <p key={index}>Rating - {`${entry.value}%`}</p>
         </div>
        ))}
      </div>
    );
  }

  return null;
};

const Journal = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [data, setData] = useState(1);


  useEffect(()=>{
    setData(journalLearning)
  },[])

  useEffect(()=>{
    const filteredJournal = journalLearning.filter((journal)=>{
      const journalYear = moment(journal.date).format("YYYY")
      const journalMonth = moment(journal.date).format("MMMM")
      const journalWeek = journal.week_number

      if(journalYear == selectedYear && journalMonth == selectedMonth && journalWeek == selectedWeek){
        return journal
      }
    })

    setData(filteredJournal)

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
    <div className="journal w-full min-h-screen">
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
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="rating" fill="#282828" activeBar={<Rectangle fill="purple" stroke="black" />} />
              </BarChart>
            </ResponsiveContainer>
          ):(
            <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
          )}
          </div>
        </Col>

        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
        <div className="w-full h-full mt-10 pr-12">
        {data.length > 0  ? (
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="rating" stroke="black" fill="purple" />
          </AreaChart>
        </ResponsiveContainer>
        ):(
          <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
        )}
      </div>
        </Col>
      </Row>
      <div className='mt-40 w-full pb-10'>
        <div className='font-semibold heading w-full flex justify-center'>Daily Journals</div>
      <Row>
        {journalLearning.map(journal=>(
            <Col xl={6} lg={8} md={12} sm={24} xs={24} className="bookRow mt-10 flex justify-center">
              <JournalCard journalData={journal}/>
            </Col>
        ))}
      </Row>
    </div>
    </div>

   
    </>
  );
};

export default Journal;
