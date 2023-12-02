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
import { techLearningData, monthsArray, weeksArray } from '../../constants/const.js';
import moment from 'moment'
import BookCard from '../../components/BookCard.jsx';
import { techsAggregatedData } from '../../utils/index.js';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import TechCard from '../../components/TechCard.jsx';

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

const Tech = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [data, setData] = useState(1);


  useEffect(()=>{
    setData(techsAggregatedData(techLearningData))
  },[])

  useEffect(()=>{
    const filteredTech = techLearningData.filter((tech)=>{
      const techYear = moment(tech.date).format("YYYY")
      const techMonth = moment(tech.date).format("MMMM")
      const techWeek = tech.week_number

      if(techYear == selectedYear && techMonth == selectedMonth && techWeek == selectedWeek){
        return tech
      }
    })

    setData(techsAggregatedData(filteredTech))

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
    <div className="tech w-full min-h-screen">
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
                <Bar dataKey="duration" fill="#282828" activeBar={<Rectangle fill="orange" stroke="black" />} />
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
            <Area type="monotone" dataKey="duration" stroke="black" fill="orange" />
          </AreaChart>
        </ResponsiveContainer>
        ):(
          <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
        )}
      </div>
        </Col>
      </Row>
      <div className='mt-40 w-full pb-10'>
        <div className='font-semibold heading w-full flex justify-center'>Technology Learning</div>
      <Row>
        {techLearningData.map(tech=>(
            <Col xl={6} lg={8} md={12} sm={24} xs={24} className="bookRow mt-10 flex justify-center">
              <TechCard techDetails={tech}/>
            </Col>
        ))}
      </Row>
    </div>
    </div>

   
    </>
  );
};

export default Tech;
