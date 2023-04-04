import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form';
import {userLogin} from '../slices/LoginSlice'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import login from '../images/login.svg'


const Login = () => {
  //destructure the attributes using useselector hook
  let {status,userObj,errorMessage}=useSelector(state=>state.login)
  console.log("userObject checking:",userObj)
  let {register,handleSubmit,formState:{errors}}=useForm()
  //to dispatch the actionobj to reducer function
  let dispatch=useDispatch()
  //to navigate create navigate() function
  let navigate=useNavigate()

  // after the first rendering of page completed then only useEffect called
  useEffect(()=>{
    if(status==="success")
    {
      // Checking role based on that navigate to required to component
      if(userObj.role==="superadmin")
      {
      navigate("/super-admin")
      }
      if(userObj.role==="admin")
      {
        navigate("/admin")
      }
      if(userObj.role==="gdohead"){
        navigate("/gdodashboard")
      }
      if(userObj.role==="projectmanager"){
        navigate("/projectmanagerdashboard")
      }
    }
  },[status])

  const onSubmit=(userCredentials)=>{
  
    console.log("user object in login:",userCredentials)
    let userActionObj=userLogin(userCredentials)
    dispatch(userActionObj)
  }
  const forgotpassword=()=>{
    navigate("/forgotpassword")
  }

  return (
    <div>
      
      <div className='row mx-auto'>
      <p className='display-4 text-primary
      
       text-center' style={{textShadow: "2px 4px 4px rgba(46,91,173,0.6)"}}>Login</p>
       <hr></hr>
       {/* conditional rendering--- if role is assigned then only login otherwise unauthorized access */}
       {
        errorMessage ? <p className="display-4 text-danger">{errorMessage}</p>:<p></p>
       }
       <div className='row'>
        <div className='col-4 col-sm-8 col-md-6'>
          {/* image */}
          <img src={login} alt="..." style={{height:"50%"}}></img>
        </div>

        <div className='col-10 col-sm-8 col-md-6  mx-auto  shadow p-3 mb-5 bg-dark text-white semibold fs-6 rounded ' style={{height:"50%"}}>
          {/* creating login form */}
        <form  onSubmit={handleSubmit(onSubmit)}>
      
        <div className='mb-4  fw-semibold'>
          {/*  Email */}
          <label htmlFor='email' className='form-label'> Email </label>
          <input type="email" {...register("email",{required:true})} name="email" id="email" className='form-control' placeholder="Enter Email"></input>
          {/* validating email */}
          {errors.name?.type==='required'&& <p className='text-danger fw-bold'>*Email is required*</p> }
        </div>
        <div className='mb-4  fw-semibold'>
          {/* Password */}
          <label htmlFor='password' className='form-label'> Password </label>
          <input type="password" {...register("password")} name="password" id="password" className='form-control' placeholder='Enter Password'></input>
          {errors.name?.type==='required' && <p className='text-danger fw-bold'>*Password is required*</p>}
        </div>
        <div className='text-center mx-auto'>
          {/* when you submit it submits  data as an object  */}
        <button type="submit" className='btn btn-primary float-start'>Login</button>
        {/* Forgot password  */}
        <button className='btn btn-primary float-end' onClick={forgotpassword}>ForgotPassword</button>
        </div>
      </form>
      </div> 
      </div>
    </div>
    </div>
  )
}

export default Login
