import React, {useEffect} from 'react'
import { useIme1Context } from '../context/ime1Context.jsx';
import { liveHard } from '../constants/const.js'
import { Row, Col } from 'antd'

const LiveHard = () => {
  const { setNavBgColor } = useIme1Context()
  useEffect(()=>{
    setNavBgColor("#838383")
  },[])
  return (
    <div className='livehard  w-full min-h-screen'>
      <Row>
        {liveHard.map(item=>(
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            {item.title}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default LiveHard