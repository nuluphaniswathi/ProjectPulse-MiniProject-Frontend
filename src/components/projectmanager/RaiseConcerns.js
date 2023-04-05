import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
const RaiseConcerns = () => {
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  //get toekn from storage
  let token=sessionStorage.getItem("token")
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //state for response
  let [response, setResponse]=useState("")
  console.log(response)
  //on submission of form
  const onSubmit=async(concernObj)=>{
    reset()
    // console.log(projectObj)
    try{
      // query to create project concern
    let res=await axios.post(`http://localhost:4000/project-manager-api/projectId/${concernObj.project_id}/project-concern-raise`,concernObj,{
      headers:{Authorization: `Bearer ${token}`}
    })
    console.log(res)
    //created successfully
    if(res.status===201){
    setResponse(res.data.message)
    setError("")
    setResponseError("")
    }
  }
  //if error thrown catch  block handles
  catch(err){
    console.log(err)
    setError(err.response.data.message)
  }
  }
  return (
    <div>
      <p className='fs-2 text-primary text-center'>RaiseConcerns</p>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p>
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
      <div className='container mx-auto'>
        {/* Creating raiseconcern form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mb-5 mx-auto bg-dark text-white " style={{width:"50%",height:"30%",boxSizing:"border-box",boxShadow:"5px 7px 7px black"}}>
        {/* project Id */}
        <div className="mb-4">
          <label htmlFor="project_id" className="form-label fw-bold">Project Id</label>
          <input type="number" {...register('project_id', {required:"*project Id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.project_id && <p className="text-danger"><strong>{errors.project_id?.message}</strong></p>}
        </div>
        {/* Concern Description */}
        <div className="mb-4">
          <label htmlFor="concern_desc" className="form-label fw-bold">Concern Description</label>
          {/* <input type="text" {...register('concern_desc', {required:"*Concern description is required"})} className="form-control"></input> */}
          <textarea {...register('concern_desc', {required:"*Concern description is required"})} rows="3" cols="45"></textarea>
          {/* validation error msg */}
          {errors.concern_desc && <p className="text-danger"><strong>{errors.concern_desc?.message}</strong></p>}
        </div>
        {/* RaisedBy */}
        <div className="mb-4">
          <label htmlFor="raised_by" className="form-label fw-bold">RaisedBy</label>
          <input type="text" {...register('raised_by', {required:"*RaisedBy is required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.raised_by && <p className="text-danger"><strong>{errors.raised_by?.message}</strong></p>}
        </div>
        {/* Raised on date */}
        <div className="mb-4">
          <label htmlFor="raised_on_date" className="form-label fw-bold">Raised on date</label>
          <input type="date" {...register('raised_on_date', {required:"*Raised date is required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.raised_on_date && <p className="text-danger"><strong>{errors.raised_on_date?.message}</strong></p>}
        </div>
        {/* severity */}
        <div className="mb-4">
          <label htmlFor="severity" className="form-label fw-bold">Severity</label>
          {/* <input type="text" {...register('severity', {required:"*Severity is required"})} className="form-control"></input> */}
          <select className="form-select"  {...register('severity', {required:"*Severity is required"})}>
            <option selected>--select Severity of Project--</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* validation error msg */}
          {errors.severity && <p className="text-danger"><strong>{errors.severity?.message}</strong></p>}
        </div>
        {/* ConcernRaisedInternally */}
        <div className="mb-4">
          <label htmlFor="concern_raised_internally" className="form-label fw-bold">ConcernRaisedInternally</label>
          {/* <input type="text" {...register('concern_raised_internally', {required:"*Concern Raised Internally is required"})} className="form-control"></input> */}
          <select className="form-select"  {...register('concern_raised_internally', {required:"*Concern Raised Internally is required"})}>
            <option selected>--Concern raised internally or not--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            
          </select>
          {/* validation error msg */}
          {errors.concern_raised_internally && <p className="text-danger"><strong>{errors.concern_raised_internally?.message}</strong></p>}
        </div>
        {/* status */}
        <div className="mb-4">
          <label htmlFor="status" className="form-label fw-bold">Status</label>
          {/* <input type="text" {...register('', status{required:"*status is required"})} className="form-control"></input> */}
          <select className="form-select"  {...register('status', {required:"*Status is required"})}>
            <option selected>--Status of the Concern--</option>
            <option value="raised">Raised</option>
            <option value="remediationsuggested">Remidiation Suggested</option>
            <option value="mitigated">Mitigated</option>
          </select>
          {/* validation error msg */}
          {errors.status && <p className="text-danger"><strong>{errors.status?.message}</strong></p>}
        </div>
         {/* mitigatedon */}
         <div className="mb-4">
          <label htmlFor="mitigated_on" className="form-label fw-bold">MitigatedOn</label>
          <input type="date" {...register('mitigated_on', {required:"*mitigatedon is required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.mitigated_on && <p className="text-danger"><strong>{errors.mitigated_on?.message}</strong></p>}
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

export default RaiseConcerns