import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'
const Card = () => {
  let navigate=useNavigate()
  //navigate to create project
  const createProject=()=>{
    navigate("create-project")
  }
  return (
    <div className="card text-center shadow p-3 mx-auto bg-secondary bg-opacity-50">
      <div className="card-body">
        <h5 className="card-title fs-3 mb-3">Create  Project</h5>
        <p className="card-text fs-5 mb-5">Click the below button to create new project!</p>
        <button className='btn mt-3 btn-success card-btn' onClick={createProject}>createproject</button>
      </div>
      </div>
  )
}
export default Card