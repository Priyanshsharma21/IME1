import React, {useEffect} from 'react'
import { useIme1Context } from '../context/ime1Context.jsx';
import { Row, Col } from 'antd'

const Home = () => {
  const { setNavBgColor } = useIme1Context()
  useEffect(()=>{
    setNavBgColor("#5478f5")
  },[])
  return (
    <div className='home w-full min-h-screen'>Home</div>
  )
}

export default Home