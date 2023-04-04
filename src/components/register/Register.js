import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import registration from '../images/registration.svg'

const Register = () => {

  let {register,handleSubmit,formState:{errors},reset}=useForm()
  //console.log(errors);
  let navigate=useNavigate();
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //state for registration confirmation
  const onSubmit=async(userObj)=>{
    reset();
    //console.log("userobject:",userObj)
    try{
    //query to create user after submitting the data
    let res=await axios.post("http://localhost:4000/user-api/register",userObj)
    console.log("user registered",res);
    //user created successfully
    if(res.status===201)
    {
      navigate('/login')
      setError("")
      setResponseError("")
    }
    }
    //if user not created throw error
    catch(err){
      console.log("err is:",err)
      setError("")
      setResponseError(err.response.data.message)
    }
  }
  return (
    <div>
      <div className='row mx-auto'>
      <p className='display-4 text-primary
      
      text-center' style={{textShadow: "2px 4px 4px rgba(46,91,173,0.6)"}}>Register</p>
      <hr></hr>
      {/* Response error occurs then display that error */}
      {
        responseError? <p className='text-secondary display-5 text-center fw-bold'>{responseError}</p>:error && <p className='text-danger fs-3 text-center'>{error}</p>
      }
        {/* svg registration image */}
        <div className='col-10 col-sm-8 col-md-6'><img src={registration} alt='...' style={{height:"50%"}} ></img></div>
      
        <div className='col-10 col-sm-8 col-md-6  mx-auto rounded p-4 shadow p-3 mb-5 bg-dark text-white semibold fs-6 rounded ' style={{height:"50%"}}>
        {/* form */}
        <form  onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4  fw-semibold'>
          {/* Name*/}
          <label htmlFor='name' className='form-label'> Name </label>
          <input type="text" {...register("user_name",{required:true,minLength:4,maxLength:15})} id="name" className='form-control' placeholder="Enter name"></input>
          {/* validating user name */}

          {errors.user_name?.type==='required' && <p className='text-danger fw-bold'>*Username is required*</p>}
          {errors.user_name?.type==='minLength' && <p className='text-danger fw-bold'>*min length is 4*</p>}
          {errors.user_name?.type==='maxLength' && <p className='text-danger fw-bold'>*max length is 15*</p>}
        </div>
        <div className='mb-4  fw-semibold'>
          {/* Email */}
          <label htmlFor='email' className='form-label'> Email </label>
          <input type="email" {...register("email",{required:true})} name="email" id="email" className='form-control' placeholder="Enter Email"></input>
          {/* validating email */}
          {errors.email?.type==='required'&& <p className='text-danger fw-bold'>*Email is required*</p> }
        </div>
        <div className='mb-4  fw-semibold'>
          {/* Password */}
          <label htmlFor='password' className='form-label'> Password </label>
          <input type="password" {...register("password",{required:true})} name="password" id="password" className='form-control' placeholder='Enter Password'></input>
          {/* validating password */}
          {errors.password?.type==='required' && <p className='text-danger fw-bold'>*Password is required*</p>}
        </div>
        <div className='text-center'>
          {/* when you submit it submits  data as an object  */}
        <button  type="submit" className='btn btn-primary' >Register</button>
        </div>
      </form>
        </div>
      </div>
    

    </div>
  )
}

export default Register