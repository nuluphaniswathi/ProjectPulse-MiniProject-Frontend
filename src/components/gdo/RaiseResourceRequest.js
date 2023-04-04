import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
//import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const RaiseResourceRequest = () => {
  let {register,handleSubmit,formState:{errors},reset}=useForm();
  //get toekn from storage
  let token=sessionStorage.getItem("token")
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //state for response
  let [response, setResponse]=useState("")
  let navigate=useNavigate()
  //console.log(response)
  const onSubmit=async(resourceObj)=>{
   reset()
    try{
        let res=await axios.post(`http://localhost:4000/gdoHead-api/projectId/${resourceObj.project_id}/resourcing-request`,resourceObj,{
            headers:{Authorization: `Bearer ${token}`}
          })
    console.log("ResourceRequest",res)
    if(res.status===200){
    setResponse(res.data.message)
    setError("")
    setResponseError("")
    navigate("/gdodashboard")
    }
    else{
      setResponseError(res.data.message)
    }
}catch(err){
 console.log(err)
 setError(err.response.data.message)
}
 }





  return (
    <div className='container-fluid'>
      <p className='display-4 text-primary text-center'>RaiseResourceRequest</p>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p>
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
      <div className='mx-auto shadow container bg-dark text-white rounded'>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mx-auto mt-5 mb-5  align-items-center " style={{width:"50%"}}>
        {/* Gdo Email */}
        <div className="mb-4">
          <label htmlFor="gdoemail" className="form-label fw-bold">GDOEmail</label>
          <input type="email" {...register('gdoemail', {required:"*GDOEmailrequired"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.gdoemail && <p className="text-danger"><strong>{errors.gdoemail?.message}</strong></p>}
        </div>
        {/* project Id */}
        <div className="mb-4">
          <label htmlFor="project_id" className="form-label fw-bold">ProjectId</label>
          <input type="number" {...register('project_id', {required:"*project id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.project_id && <p className="text-danger"><strong>{errors.project_id?.message}</strong></p>}
        </div>
        {/* Request Description */}
        <div className="mb-4">
          <label htmlFor="request_desc" className="form-label fw-bold">Request Description</label>
          <input type="text" {...register('request_desc', {required:"*Request Description required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.request_desc && <p className="text-danger"><strong>{errors.request_desc?.message}</strong></p>}
        </div>
        {/* submit button */}
        <div>
          <button type="submit" className="btn btn-primary">submit</button>
        </div>
      </form>
      </div>


    </div>
  )
}

export default RaiseResourceRequest