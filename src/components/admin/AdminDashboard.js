import React from 'react'

//Navlink- A special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL
import { NavLink } from 'react-router-dom';
//An <Outlet> should be used in parent route elements to render their child route elements
import { Outlet } from 'react-router-dom';
//creating admin component
const Admin = () => {
    
  return (
  
    <div className='container'>
      {/* Admin Dashboard */}
        <div className='row'>
            <div className='col-2  ' style={{backgroundColor:"rgb(154, 206, 235)"}} >
                <ul className="nav flex-column text-center ">
                  {/* CreateProject */}
              <li className="nav-item text-black w-100 mt-2 bg-warning" style={{color:"black"}}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link text-primary" : "inactive nav-link text-black "
                  }
                  to="create-project"
                >
                  CreateProject
                </NavLink>
              </li>
                {/* Dashboard */}
                <li className="nav-item text-black w-100 bg-warning mt-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active nav-link text-primary container  fs-5" : "inactive nav-link text-black"
                    }
                    to="getprojectsbyadmin"
                  >
                    Dashboard
                  </NavLink>
                </li>
                {/* UpdateProject */}
               
                <li className="nav-item text-white w-100 bg-warning   mt-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active nav-link text-primary fs-6 p-2" : "inactive nav-link text-black p-2"
                    }
                    to="getresourcerequest"
                  >
                    ResourceRequests
                  </NavLink>
                </li>

              </ul>
            </div>
    
            <div className='container col-10'> 
            {/* to render child components what we select use Outlet */}
            <Outlet/>   
            </div>
      
   
    </div>
       
 </div>


  )
}

export default Admin