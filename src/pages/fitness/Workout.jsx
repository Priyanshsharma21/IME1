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
  LineChart,
  Line,
} from 'recharts';
import {gymWorkoutData, cardioData, monthsArray, weeksArray, days} from '../../constants/const'
import moment from 'moment'
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
          <p key={index}>Title - {`${entry.payload.name || entry.payload.workout_type}`}</p>
          <p key={index}>Duration - {`${entry.value} ${entry.payload.type === "cardio" ? "seconds" : "minutes"}`}</p>
         </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomGymTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((entry, index) => (
         <div className='tooltipMain'>
          <p key={index}>Title - {entry.payload.name}</p>
          <p key={index}>Rest - {entry.payload.rest_bw_sets} seconds</p>
          <p key={index}>Total Sets - {entry.payload.sets_performed}</p>
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
          <p key={index}>Set Number - {entry.payload.set_number}</p>
          <p key={index}>Total Weight - {entry.payload.weight} kg</p>
          <p key={index}>Total Reps - {entry.payload.reps}</p>
         </div>
        ))}
      </div>
    );
  }
  return null;
};



const Workout = () => {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(moment().format('MMMM'));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [cardio, setCardio] = useState({});
  const [cardioRaw, setCardioRaw] = useState({});
  const [gym, setGym] = useState({});
  const [gymExercise, setGymExercise] = useState({});
  const [exercises, setExercises] = useState({});
  const [exerciseData, setExerciseData] = useState({});

  useEffect(()=>{
    setCardio(cardioData)
  },[])

  useEffect(()=>{
    const filteredCardioExercises = cardioData.filter((cardio)=>{
      const cardioYear = moment(cardio.date).format("YYYY")
      const cardioMonth = moment(cardio.date).format("MMMM")
      const cardioWeek = cardio.week_number
      const cardioDay = cardio.day

      if(cardioYear == selectedYear && cardioMonth == selectedMonth && cardioWeek == selectedWeek && cardioDay === selectedDay){
        return cardio
      }
    })

    const filteredCardio = cardioData.filter((cardio)=>{
      const cardioYear = moment(cardio.date).format("YYYY")
      const cardioMonth = moment(cardio.date).format("MMMM")
      const cardioWeek = cardio.week_number
      if(cardioYear == selectedYear && cardioMonth == selectedMonth && cardioWeek == selectedWeek){
        return cardio
      }
    })

    const filteredGym = gymWorkoutData.filter((gym)=>{
      const gymYear = moment(gym.date).format("YYYY")
      const gymMonth = moment(gym.date).format("MMMM")
      const gymWeek = gym.week_number
      if(gymYear == selectedYear && gymMonth == selectedMonth && gymWeek == selectedWeek){
        return gym
      }
    })

    const filteredGymExercise = gymWorkoutData.filter((gym)=>{
      const gymYear = moment(gym.date).format("YYYY")
      const gymMonth = moment(gym.date).format("MMMM")
      const gymWeek = gym.week_number
      const gymDay = gym.day
      if(gymYear == selectedYear && gymMonth == selectedMonth && gymWeek == selectedWeek && gymDay === selectedDay){
        return gym
      }
    })

    
    setGym(filteredGym)
    setGymExercise(filteredGymExercise[0].exercises_performed)
    const exercises = filteredGymExercise[0].exercises_performed?.map((exercise,i)=>{
      return {
        name : exercise.name,
        key : i
      }
    })

    const filterExerciseInfo = filteredGymExercise[0].exercises_performed?.filter((exercise,i)=>{
      if(exercise.name === selectedExercise){
        return exercise
      }
    })

    setExerciseData(filterExerciseInfo[0].sets_info)

    setExercises(exercises)
    setCardioRaw(filteredCardio)
    setCardio(filteredCardioExercises[0]?.exercises_performed)

  },[selectedYear, selectedMonth, selectedWeek, selectedDay, selectedExercise])

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

  const handleExerciseChange = (value) => {
    setSelectedExercise(value);
  };

  return (
    <div className="workout w-full min-h-screen overflow-scroll">
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
                <Select value={selectedDay} onChange={handleDayChange} className='ml-2'>
                  <Option value="">Days</Option>
                  {days.map((day) => (
                    <Option key={day.key} value={day.title}>
                      {day.title}
                    </Option>
                  ))}
                </Select>

                {Object.entries(exercises).length > 0 && (
                  <Select value={selectedExercise} onChange={handleExerciseChange} className='ml-2'>
                  <Option value="">Exercise</Option>
                  {exercises?.map((exercise,i) => (
                    <Option key={exercise.key} value={exercise.name}>
                      {exercise.name}
                    </Option>
                  ))}
                </Select>
                )}
              </div>
      <Row>
        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
          <div className="w-full h-full mt-10 pr-12">
          {cardioRaw?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cardio}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={0} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="timing" fill="#282828" activeBar={<Rectangle fill="#ffa8a8" stroke="black" />} />
              </BarChart>
            </ResponsiveContainer>
          ):(
            <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
          )}
          </div>
        </Col>

        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
        <div className="w-full h-full mt-10 pr-12">
        {cardio?.length > 0  ? (
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={cardioRaw}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="duration" stroke="black" fill="#ffa8a8" />
          </AreaChart>
        </ResponsiveContainer>
        ):(
          <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
        )}
      </div>
        </Col>
      </Row>


      <Row>
        <Col xl={8} lg={24} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
          <div className="w-full h-full mt-10 pr-12">
          {gym?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gym}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={0} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ):(
            <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
          )}
          </div>
        </Col>

        <Col xl={8} lg={24} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
        <div className="w-full h-full mt-10 pr-12">
        {gymExercise?.length > 0  ? (
          <>
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={gymExercise}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomGymTooltip />}/>
            <Area type="monotone" dataKey="rest_bw_sets" stroke="black" fill="#ffa8a8" />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={gymExercise}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomGymTooltip />}/>
            <Area type="monotone" dataKey="sets_performed" stroke="black" fill="#202020" />
          </AreaChart>
        </ResponsiveContainer>
          </>
        ):(
          <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
        )}
      </div>
        </Col>


        <Col xl={8} lg={24} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
          <div className="w-full h-full mt-10 pr-12">
            {selectedExercise && (
              <div>{selectedExercise}</div>
            )}
          {gym?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={exerciseData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weight" angle={0} />
                <YAxis />
                <Tooltip content={<CustomGymTooltip2 />} />
                <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          ):(
            <div className="flex justify-center font-semibold">No Data Found For This Dates!!!</div>
          )}
          </div>
        </Col>


      </Row>
    </div>
  )
}

export default Workout