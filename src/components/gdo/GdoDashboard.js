import React from 'react'
import { NavLink ,useNavigate} from "react-router-dom";
import {Outlet} from 'react-router-dom';
//import GetProjects from '../admin/GetProjects';

const GdoDashboard = () => {
    let navigate=useNavigate();

  return (
    <div className='container-fluid'>
        <div className='container-fluid'>
        <div className='row text-center'>
            <div className='col-3  p-2'style={{backgroundColor:"rgb(154, 206, 235)"}}>
          <ul className="nav flex-column text-center ">
        <li className="  nav-item text-white w-100  btn btn-success mt-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link " : "inactive nav-link "
            }
            to="addteam"
          >
            AddTeam
          </NavLink>
        </li> 
        <li className="nav-item text-white w-100   btn btn-success mt-2 p-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="raise-resource-request"
          >
            RaiseResourceRequest
          </NavLink>
        </li>
        <li className="nav-item text-white w-100   btn btn-success mt-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="getprojectsbygdo"
          >
            Dashboard
          </NavLink>
        </li>       
      </ul>

            </div>
            <div className='col-9'> 
   
            <Outlet/>   
            </div>

        </div>
    </div>
    </div>
    
    


      
  
  )
}

export default GdoDashboard
