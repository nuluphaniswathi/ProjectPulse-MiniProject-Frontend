import React from 'react'

import {Outlet} from 'react-router-dom'

const SuperAdmin = () => {
  return (
    <div>
      <div className="mx-auto text-center">
      <Outlet/>
      </div>
      
        
    </div>
    
  )
}

export default SuperAdmin