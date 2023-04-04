import React from 'react'
import wal from '../images/wal.png'
const Home = () => {
  return (
    <div>
      <p className='display-4 text-primary text-center textShadow '>ProjectPulse</p>
      <hr></hr>
        <div className='row '>
        
          <div className='col'>
            {/* inserting image on one side */}
          <img src={wal} alt='...' style={{width:"25rem",minheight:"30rem"}} className='align-left'></img>
          </div> 
          {/* and content on other side */}
          <div className='col'>          
          <p className='fw-semibold fs-3'>This product will serve as tracking tool for projects and portfolio for each GDO and overall organisation.</p>
          </div>
        </div>  
    </div>
  )
}
// exporting home component
export default Home
