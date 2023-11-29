import React, { useEffect } from 'react';
import { useIme1Context } from '../context/ime1Context.jsx';
import { mindHomeCard } from '../constants/const.js';
import { Row, Col } from 'antd';

const Mindset = () => {
  const { setNavBgColor } = useIme1Context();

  useEffect(() => {
    setNavBgColor("#e188ff");
  }, []);

  return (
    <div className='mindset w-full min-h-screen flex justify-center items-center'>
      <Row className='w-[90%]' gutter={[16, 16]}>{/* Adjust the gutter values as needed */}
        {mindHomeCard.map((item, index) => (
          <Col key={index} xl={8} lg={8} md={24} sm={24} xs={24} className='mindHomeCards w-full min-h-[400px]'>
            {item.title}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Mindset;
