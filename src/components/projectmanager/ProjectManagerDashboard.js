import React from 'react'
import { NavLink ,useNavigate} from "react-router-dom";
import {Outlet} from 'react-router-dom';
const ProjectManagerDashboard = () => {
  return (
    <div>
         <div className='row'>
            <div className='col-3 ' style={{backgroundColor:"rgb(154, 206, 235)"}}>
            <ul className="nav flex-column ">
              {/* Raise Project Concern */}
        <li className="nav-item text-white btn btn-warning mt-2 mx-auto my-auto">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link text-primary" : "inactive nav-link text-black"
            }
            to="raise-project-concerns"
          >
            RaiseProjectConcerns
          </NavLink>
        </li>
        {/* Create Project update */}
        <li className="nav-item text-white btn btn-warning mx-auto m-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link text-primary" : "inactive nav-link text-black"
            }
            to="createprojectupdate"
          >
            CreateProjectUpdate
          </NavLink>
        </li>
        {/* Get Projects under him */}
        <li className="nav-item text-white btn btn-warning mx-auto m-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link text-primary" : "inactive nav-link text-black"
            }
            to="getprojectsbyprojectmanager"
          >
            portfolioDashboard
          </NavLink>
        </li>
        
      </ul>

            </div>
            <div className='col-9'> 
   
            <Outlet/>   
            </div>

        </div>


      
    </div>
  )
}

export default ProjectManagerDashboard


