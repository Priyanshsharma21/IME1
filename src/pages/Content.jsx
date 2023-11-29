import React, {useEffect} from 'react'
import { useIme1Context } from '../context/ime1Context.jsx';
import { content } from '../constants/const.js'
import { Row, Col } from 'antd'

const Content = () => {
  const { setNavBgColor } = useIme1Context()
  useEffect(()=>{
    setNavBgColor("#fff75e")
  },[])
  return (
    <div className='content w-full min-h-screen'>
      <Row>
        {content.map(item=>(
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            {item.title}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Content