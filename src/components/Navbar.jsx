import React, { useState } from 'react'
import { Button, Drawer } from 'antd';
import { navItems } from '../constants/const.js'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useIme1Context } from '../context/ime1Context.jsx';
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { navBgColor } = useIme1Context()
  return (
    <div>
        <nav className="navbar z-10 absolute top-4 right-7 cursor-pointer">
            <RxHamburgerMenu style={{fontSize : 30}} onClick={()=>setOpen(true)}/>
        </nav>

     <Drawer style={{ background: `linear-gradient(to top, ${navBgColor}, white )`}} width="90%" placement="right" onClose={()=>setOpen(false)} open={open}>
        {navItems.map((item)=>(
            <div className="mt-10">
                <Link onClick={()=>setOpen(false)} className="navLinks font-semibold" to={item.path}>{item.title}</Link>
            </div>
        ))}
      </Drawer>
    </div>
  )
}

export default Navbar