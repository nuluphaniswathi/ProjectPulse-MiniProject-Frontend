import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import resetpassword from '../images/resetpassword.svg'
const ResetPassword = () => {

    let navigate=useNavigate();
    let {state}=useLocation();

    //console.log("state in reset password",state)

    let {register,handleSubmit,reset}=useForm()
     //state for error
    let [error,setError]=useState()
    //state for response error
    let [responseError,setResponseError]=useState("")

    const onSubmit=async(resetObj)=>{
        reset()
        console.log("resetObject:",resetObj)
        try{
            let res=await axios.post(`http://localhost:4000/user-api/reset-password/email/${state.email}`,resetObj)
            console.log("",res);
            if(res.status===200)
            {
              navigate('/login')
              setError("")
              setResponseError("")
            }
        }
        catch(err){
              console.log("err is:",err)
              setError("")
              setResponseError(err.response.data.message)
        }

    }



  return (
    <div>

        {
        responseError? <p className='text-secondary display-5 text-center fw-bold'>{responseError}</p>:error && <p className='text-danger fs-3 text-center'>{error}</p>
      }
    <p className='text-center display-4 text-primary m-2'>Reset password</p> 
    <hr></hr>
    <div className='row mx-auto mb-4'>
    <div className='col-10 col-sm-8 col-md-6'><img src={resetpassword} alt='...' style={{height:"50%",width:"90%"}} ></img></div>
    <div className='col-10 col-sm-8 col-md-6' >
     <form onSubmit={handleSubmit(onSubmit)}>

     <div className='mb-4  fw-semibold'>
          <label htmlFor='otp' className='form-label'> OTP </label>
          <input type="number" {...register("otp")} name="otp" id="otp" className='form-control' placeholder="Enter OTP"></input>    
     </div>
     <div className='mb-4  fw-semibold'>
          <label htmlFor='password' className='form-label'> password </label>
          <input type="password" {...register("password")} name="password" id="password" className='form-control' placeholder="Enter Password"></input>    
     </div>
     <div className='text-center'>
        <button type="submit" className='btn btn-primary rounded'>Reset Password</button>
     </div>
     </form>
     </div>
     </div>

    </div>
  )
}

export default ResetPassword