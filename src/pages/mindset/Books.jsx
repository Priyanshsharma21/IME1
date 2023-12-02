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
} from 'recharts';
import { booksAndPodcastData } from '../../constants/const.js';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index}>{`${entry.payload.title}: ${entry.value} minutes`}</p>
        ))}
      </div>
    );
  }

  return null;
};

const Books = () => {
  return (
    <div className="books w-full min-h-screen">
      <Row>
        <Col span={24} className="w-full h-[80vh]">
          <div className="w-full h-full mt-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={booksAndPodcastData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="duration" fill="#282828" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Books;
