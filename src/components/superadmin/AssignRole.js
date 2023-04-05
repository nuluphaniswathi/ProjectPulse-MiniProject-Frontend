import React,{useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form';
//import { loginSlice } from '../slices/LoginSlice';
//import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const AssignRole = () => {
  //let {userObj,status}=useSelector(state=>state.login);
  let token=sessionStorage.getItem("token")
  let {register,handleSubmit,formState:{errors},reset,setValue}=useForm();
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //positiveResponse
  let [response,setResponse]=useState()
  let navigate=useNavigate()
  //take state
  let {state}=useLocation();
  console.log("state",state)
  
  let onSubmit=async(roleObj)=>{
    console.log("roleObject:",roleObj)
    roleObj.email=state.email;
    reset()
    try{
      //query to update the role 
      let res=await axios.put("http://localhost:4000/superadmin-api/user/role",roleObj,
      {headers:{Authorization:`Bearer ${token}`}})
      console.log(res.data)
    
      setResponse(res.data.message)
      setError("")
      setResponseError("")  
      }
      //if error
    catch(err){
      console.log("error in assign role:",err.message)
      setError("")
      setResponseError(err.response.data.message)
    }
  }

  return (
    <div>
        <p className="display-4 text-success text-center fw-bold">AssignRole</p>
        <div className='row mx-auto'>
        <div className='col-10 col-sm-8 col-md-6  mx-auto rounded p-4'>

        {
        responseError? <p className='text-secondary display-5 text-center fw-bold'>{responseError}</p>:error ? <p className='text-danger fs-3 text-center'>{error}</p>:<p className='text-success fw-semibold fs-3'>{response}</p>
        }
          {/* creating assigning role  form */}
        <div className='container mx-auto  p-4 shadow p-3 mb-5 bg-dark text-white semibold fs-6 rounded '>
          {/* form */}
        <form  onSubmit={handleSubmit(onSubmit)} >
        
        <div className='mb-4  fw-semibold'>
          {/* Email */}
          <label htmlFor='email' className='form-label'> Email </label>
          <input type="email"  value={state.email} disabled className='form-control' placeholder="Enter Email" ></input>
          {/* validating email */}
         
          {errors.email?.type==='required'&& <p className='text-danger fw-bold'>*Email is required*</p> }
        </div>
        <div className='mb-4  fw-semibold'>
          <label htmlFor='role' className='form-label'> Role </label>
          <select class="form-select form-select-lg mb-3" {...register("role")} aria-label=".form-select-lg example">
              <option selected>Open this select menu</option>
              <option value="gdohead">GdoHead</option>
              <option value="admin">Admin</option>
              <option value="projectmanager">ProjectManager</option>
              <option value="hrmanager">HR Manager</option>
              
          </select>
          {/* <input type="role" {...register("role")} name="role" id="role" className='form-control' placeholder='Enter Role'></input> */}
          {errors.role?.type==='required' && <p className='text-danger fw-bold'>*Role is required*</p>}
        </div>
        <div className='text-center'>
          {/* when you submit it submits  data as an object  */}
        <button  type="submit" className='btn btn-primary m-2' >AssignRole</button>
        <button   className='btn btn-primary ' onClick={()=>navigate("../get-users")}>Back</button>
        </div>
      </form>
      </div>
      </div>
      </div>

    </div>
  )
}

export default AssignRole
