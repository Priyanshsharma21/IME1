import React, {useEffect} from 'react'
import { useIme1Context } from '../context/ime1Context.jsx';
import { healthAndFitness } from '../constants/const.js'
import { Row, Col } from 'antd'

const Fitness = () => {
  const { setNavBgColor } = useIme1Context()
  useEffect(()=>{
    setNavBgColor("#6fff7e")
  },[])
  return (
    <div className='fitness w-full min-h-screen'>
       <Row>
        {healthAndFitness.map(item=>(
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            {item.title}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Fitness