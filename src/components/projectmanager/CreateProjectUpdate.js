import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
const CreateProjectUpdate = () => {

    let {register,handleSubmit,formState:{errors},reset}=useForm()
      //get toekn from storage
  let token=sessionStorage.getItem("token")
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //state for response
  let [response, setResponse]=useState("");

    const onSubmit=async(projectUpdateObj)=>{
      console.log("formdata:",projectUpdateObj)
      reset()
    try{
      //query to create project update
        let res=await axios.post(`http://localhost:4000/project-manager-api/projectId/${projectUpdateObj.project_id}/project-update`,projectUpdateObj,{
            headers:{Authorization: `Bearer ${token}`}
          })
    console.log("projectupdate",res.data)
    if(res.status===201){
    setResponse(res.data.message)
    setError("")
    setResponseError("")
    }
  }
  //error thrown
  catch(err){
   
    console.log(err)
    setError(err.response.data.message)
  }


    }
  return (
    <div>
      <p className='display-6 text-center text-primary  fw-bold register-text'>CreateProjectUpdate</p>
      <hr></hr>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p>
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
      <div className='container mx-auto shadow p-3 mb-5 bg-dark text-white semibold fs-6 rounded '>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mb-5 mx-auto" style={{width:"50%"}}>
        {/* project Id */}
        <div className="mb-4">
          <label htmlFor="project_id" className="form-label fw-bold">Project Id</label>
          <input type="number" {...register('project_id', {required:"*project Id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.project_id && <p className="text-danger"><strong>{errors.project_id?.message}</strong></p>}
        </div>
        {/* Date */}
        <div className="mb-4">
          <label htmlFor="Date" className="form-label fw-bold">Date</label>
          <input type="date" {...register('Date', {required:"*Date is required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.date && <p className="text-danger"><strong>{errors.date?.message}</strong></p>}
        </div>
        {/* status_update */}
        <div className="mb-4">
          <label htmlFor="status_update" className="form-label fw-bold">StatusUpdate</label>
          <input type="text" {...register('status_update', {required:"*status update is required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.status_update && <p className="text-danger"><strong>{errors.status_update?.message}</strong></p>}
        </div>
        {/* schedule status */}
        <div className="mb-4">
          <label htmlFor="schedule_status" className="form-label fw-bold">Schedule Status</label>
          {/* <input type="text" {...register('schedule_status', {required:"*schedule is required"})} className="form-control"></input> */}
          <select class="form-select"  {...register('schedule_status', {required:"*schedule is required"})}>
            <option selected>--select schedule status--</option>
            <option value="red">Red</option>
            <option value="amber">Amber</option>
            <option value="green">Green</option>
          </select>
          {/* validation error msg */}
          {errors.schedule_status && <p className="text-danger"><strong>{errors.schedule_status?.message}</strong></p>}
        </div>
        {/* resourcing status */}
        <div className="mb-4">
          <label htmlFor="resourcing_status" className="form-label fw-bold">Resourcing Status</label>
          {/* <input type="text" {...register('resourcing_status', {required:"*Resourcing Status is required"})} className="form-control"></input> */}
          <select class="form-select"  {...register('resourcing_status', {required:"*Resourcing Status is required"})}>
            <option selected>--select resourcing status--</option>
            <option value="red">Red</option>
            <option value="amber">Amber</option>
            <option value="green">Green</option>
          </select>
          {/* validation error msg */}
          {errors.resourcing_status && <p className="text-danger"><strong>{errors.resourcing_status?.message}</strong></p>}
        </div>
        {/* QualityStatus */}
        <div className="mb-4">
          <label htmlFor="quality_status" className="form-label fw-bold">Quality Status</label>
          {/* <input type="text" {...register('quality_status', {required:"*Quality status is required"})} className="form-control"></input> */}
          <select class="form-select"  {...register('quality_status', {required:"*Quality Status is required"})}>
            <option selected>--select Quality status--</option>
            <option value="red">Red</option>
            <option value="amber">Amber</option>
            <option value="green">Green</option>
          </select>

          {/* validation error msg */}
          {errors.quality_status && <p className="text-danger"><strong>{errors.quality_status?.message}</strong></p>}
        </div>
        {/* domain */}
        <div className="mb-4">
          <label htmlFor="client_inputs" className="form-label fw-bold">Clientinputs</label>
          {/* <input type="text" {...register('client_inputs', {required:"*client_inputs is required"})} className="form-control"></input> */}
          <select class="form-select"  {...register('client_inputs', {required:"*Client inputs are required"})}>
            <option selected>--select client inputs--</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          {/* validation error msg */}
          {errors.client_inputs && <p className="text-danger"><strong>{errors.client_inputs?.message}</strong></p>}
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

export default CreateProjectUpdate
