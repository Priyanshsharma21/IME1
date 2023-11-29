import React, {useEffect} from 'react'
import { useIme1Context } from '../context/ime1Context.jsx';
import { finance } from '../constants/const.js'
import { Row, Col } from 'antd'

const Expense = () => {
  const { setNavBgColor } = useIme1Context()
  useEffect(()=>{
    setNavBgColor("#665eff")
  },[])
  return (
    <div className='expense w-full min-h-screen'>
      <Row>
        {finance.map(item=>(
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            {item.title}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Expense