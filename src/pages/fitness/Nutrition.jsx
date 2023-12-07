import { Row, Col, Select, Skeleton } from 'antd';
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
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';
import {nutritionData, monthsArray, weeksArray, days} from '../../constants/const'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { CardioCard, GymCard } from '../../components'

const { Option } = Select;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((entry, index) => (
         <div className='tooltipMain'>
          <p>Date - {`${moment(entry.payload.date).format("DD MMM YY")}`}</p>
          <p key={index}>Calories - {`${entry.payload.calories_consumed}`}</p>
          <p key={index}>Day - {entry.payload.day}</p>
         </div>
        ))}
      </div>
    );
  }
  return null;
};


const CustomGymTooltip2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((entry, index) => (
         <div className='tooltipMain'>
          <p>Date - {`${moment(entry.payload.date).format("DD MMM YY")}`}</p>
          <p key={index}>Calories - {`${entry.payload.calories_consumed}`}</p>
          <p key={index}>Day - {entry.payload.day}</p>
          <p key={index}>Day - {entry.payload.protein_count}</p>
          <p key={index}>Day - {entry.payload.carbs_count}</p>
          <p key={index}>Day - {entry.payload.fat_count}</p>
         </div>
        ))}
      </div>
    );
  }
  return null;
};


const Nutrition = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [nutrition, setNutrition] = useState(null)
  const [dailyMacrosStats, setDailyMacrosStats] = useState(null)
  const [weekCaloriesStats, setWeekCaloriesStats] = useState(null)

  useEffect(()=>{
    setNutrition(nutritionData)
  },[])

  useEffect(()=>{
    const filteredNutrition = nutritionData?.filter((nutrition)=>{
      const nutritionYear = moment(nutrition.date).format("YYYY")
      const nutritionMonth = moment(nutrition.date).format("MMMM")
      const nutritionWeek = nutrition.week_number
      const nutritionDay = nutrition.day

      if(nutritionYear == selectedYear && nutritionMonth == selectedMonth && nutritionWeek == selectedWeek && nutritionDay === selectedDay){
        return nutrition
      }
    })

    const filteredWeekNutrition = nutritionData?.filter((nutrition)=>{
      const nutritionYear = moment(nutrition.date).format("YYYY")
      const nutritionMonth = moment(nutrition.date).format("MMMM")
      const nutritionWeek = nutrition.week_number

      if(nutritionYear == selectedYear && nutritionMonth == selectedMonth && nutritionWeek == selectedWeek){
        return nutrition
      }
    })
    setWeekCaloriesStats(filteredWeekNutrition)
    setDailyMacrosStats(filteredNutrition)
  },[selectedMonth, selectedWeek, selectedDay, selectedYear])

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

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };


  return (
    <div className='w-full nutrition min-h-screen bg-[#7aff5fc8]'>
       <div className="absolute cursor-pointer backbtn top-10" onClick={()=>navigate(-1)}>
        <IoMdArrowRoundBack />
      </div>

      <div className='font-semibold mt-20 heading w-full flex justify-center'>Analytics</div>
    <div className="filters mt-5 mb-4 w-full">
      <Row>
        <Col xl={6} lg={6} md={6} sm={12} xs={12} className="flex w-full justify-center mt-5">
        <Select value={selectedYear} onChange={handleYearChange}>
                  {years.map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="flex justify-center mt-5">
        <Select value={selectedMonth} onChange={handleMonthChange} className='ml-2'>
                  <Option value="">All Months</Option>
                  {monthsArray.map((month) => (
                    <Option key={month.monthNumber} value={month.monthName}>
                      {month.monthName}
                    </Option>
                  ))}
                </Select>
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="flex justify-center mt-5">
        <Select value={selectedWeek} onChange={handleWeekChange} className='ml-2'>
                  <Option value="">All Weeks</Option>
                  {weeksArray.map((week) => (
                    <Option key={week.weekNumber} value={week.weekNumber}>
                      {week.weekLabel}
                    </Option>
                  ))}
                </Select>
        </Col>
        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="flex justify-center mt-5">
        <Select value={selectedDay} onChange={handleDayChange} className='ml-2'>
                  <Option value="">Days</Option>
                  {days.map((day) => (
                    <Option key={day.key} value={day.title}>
                      {day.title}
                    </Option>
                  ))}
                </Select>
        </Col>
      </Row>

      <Row>
      <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
         <div className='font-semibold flex justify-center w-full'>Week {selectedWeek} Calories Intake</div>

          <div className="w-full h-full mt-10 pr-12">
          {weekCaloriesStats?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weekCaloriesStats}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={0} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="calories_consumed" fill="#51cf66" stroke="black" activeBar={<Rectangle fill="#ffa8a8" stroke="black" />} />
              </BarChart>
            </ResponsiveContainer>
          ):(
            <Skeleton active className='pl-16'>No Data Found For This Dates!!!</Skeleton>
          )}
          </div>
        </Col>

        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
         <div className='font-semibold flex justify-center w-full mmt'>Week {selectedWeek} Macros</div>
          <div className="w-full h-full mt-10 pr-12">
          {weekCaloriesStats?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={weekCaloriesStats}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={0} />
                <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
                <Area type="monotone" dataKey="protein_count" fill="#ffd43b" stroke="black" />
                <Bar dataKey="carbs_count" barSize={20} fill="#fa5252" stroke="black"/>
                <Line type="monotone" dataKey="fat_count" stroke="#63e6be" />
              </ComposedChart>
            </ResponsiveContainer>
          ):(
            <Skeleton active className='pl-16'>No Data Found For This Dates!!!</Skeleton>
          )}
          </div>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default Nutrition