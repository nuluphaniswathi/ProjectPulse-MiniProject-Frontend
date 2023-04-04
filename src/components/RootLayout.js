
import React from 'react'
import {Outlet} from 'react-router-dom'
//outlet acts like placeholder we need to substitute it which component we select
import Header from './header/Header'
import Footer from './footer/Footer'

const RootLayout = () => {

    
  return (
    <div>
         {/* header layout */}
         <Header/>
       
       {/* main content*/}
       <div style={{minHeight:'80vh',marginLeft:"1px"}} className="container mt-5">
       {/* components are rendered dynamically */}
       <Outlet/>
       </div>

       {/* footer */}
       <Footer/>   
    </div>
  )
}

export default RootLayout


