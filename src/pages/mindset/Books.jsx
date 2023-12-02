import { Row, Col } from 'antd';
import React from 'react';
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
import { booksAndPodcastData } from '../../constants/const.js';
import moment from 'moment'
import BookCard from '../../components/BookCard.jsx';
import { booksAggregatedData } from '../../utils/index.js';

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

  return (
    <>
    <div className="books w-full min-h-screen">
      <Row>
        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="w-full h-[40vh] mt-10">
          <div className="w-full h-full mt-10 pr-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={booksAggregatedData(booksAndPodcastData)}
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
            data={booksAggregatedData(booksAndPodcastData)}
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
        <div className='font-semibold text-[2rem] w-full flex justify-center'>Books & Podcasts</div>
      <Row>
        {booksAndPodcastData.map(item=>(
            <Col xl={6} lg={8} md={12} sm={24} xs={24}>
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
