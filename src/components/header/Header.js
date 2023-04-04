import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {clearState} from '../slices/LoginSlice'
import { useNavigate } from 'react-router-dom'
import './Header.css'
const Header = () => {
  let {status,userObj}=useSelector(state=>state.login)
  let navigate=useNavigate()
  let dispatch=useDispatch()
  const logout=()=>{
    //remove token
    sessionStorage.removeItem("token")
    //clear state
    dispatch(clearState())
    //navigate to login
    navigate("/login")
    
  }

  return (
    <div>
        {/* conditional rendering login success logout should display  */}
        <div className='bg bg-dark'>
        {
          status==="success"? <ul className="nav justify-content-center "> <li>
          <NavLink className="nav-link flex-start" style={{color:"white"}}>{userObj.role}</NavLink></li>
          {/*when login success lougout appears Link for logout */}
          <li><NavLink className="nav-link" style={{color:"white"}} to="/login" onClick={logout}> LogOut</NavLink>
          </li></ul>:(
        <ul className="nav justify-content-center ">
        <li className="nav-item">
        
        {/* Link for home */}
        <NavLink className={({isActive})=> isActive?"active nav-link":"inactive nav-link"} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
        {/* Link for register */}
        <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        <li>
        {/* Link for login */}
        <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        </ul>
          )
        }
       </div>
        
    </div>

  )
}

export default Header