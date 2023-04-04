import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import forgot from '../images/forgot.svg'
//Forgotpassword component 
const ForgotPassword = () => {
  //destructure the attributes from useForm
    let {handleSubmit,register}=useForm()
    let navigate=useNavigate()
    //state for error
  let [error,setError]=useState()
  //state for forget
  let [forget,setforget]=useState({})
  //state for response error
  let [responseError,setResponseError]=useState("")
    const navigatetoreset=()=>{
        // console.log("forgot in navigate:",forgotObject);
        navigate("/resetpassword",{state:forget})
    }
    console.log("forgot outside:",forget)

    const onSubmit=async(forgotObj)=>{
        setforget({...forget,...forgotObj})
        console.log("forgot in submit:",forget)

        try{
            let res=await axios.post("http://localhost:4000/user-api/forget-password",forgotObj)
            //console.log(forgotObj)
            
            console.log(res.data)
            setError("")
            setResponseError("")
        }
        catch(err){
            console.log("err is :",err)
            setError("")
            setResponseError(err.message)
        }
     }

  return (
    <div className='row mx-auto' >
     <p className='display-4 text-primary text-center'>Forgot password</p> 
     <hr></hr>
     <div className='col-10 col-sm-8 col-md-6'><img src={forgot} alt='...' style={{height:"50%",width:"90%"}} ></img></div>

    <div className='col-10 col-sm-8 col-md-6' >
     <form onSubmit={handleSubmit(onSubmit)}>

     <div className='mb-4  fw-semibold'>
          <label htmlFor='email' className='form-label'> Email </label>
          <input type="email" {...register("email")}name="email" id="email" className='form-control' placeholder="Enter Email"></input>    
     </div>
     <div className='text-center '>
        <button className='btn btn-primary rounded float-start' type="submit">Submit</button>
        {/* {
            console.log("jsx:",forgotObject)
        } */}
        <button className='btn btn-primary rounded float-end' onClick={navigatetoreset}>Reset Password</button>
     </div>
     </form>
     </div>

    </div>
  )
}

export default ForgotPassword
