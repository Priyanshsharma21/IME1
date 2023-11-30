import React, {useEffect, useState} from 'react'
import { useIme1Context } from '../../context/ime1Context.jsx';
import { content } from '../../constants/const.js'
import { Row, Col } from 'antd'

const Content = () => {
  const { setNavBgColor } = useIme1Context()
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(()=>{
    setNavBgColor("#fff75e")
  },[])
  return (
    <div className='content w-full min-h-screen pb-10 flex justify-center items-center'>
    <Row className='w-[90%]' gutter={[16, 16]}>
      {content.map((item, index) => (
        <Col key={index} xl={8} lg={8} md={24} sm={24} xs={24}>
          <div
            className='mindHomeCards w-full min-h-[400px] cursor-pointer'
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <div className="overlay">
                <p className="title w-full h-full text-white flex justify-center items-center">{item.title}</p>
              </div>
            )}
          </div>
        </Col>
      ))}
    </Row>
  </div>
  )
}

export default Content