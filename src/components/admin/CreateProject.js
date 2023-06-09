import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const CreateProject = () => {
  let {register,handleSubmit,formState:{errors},reset}=useForm()
  let navigate=useNavigate()
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
  const onSubmit=async(projectObj)=>{
    reset()
    // console.log(projectObj)
    try{
    let res=await axios.post("http://localhost:4000/admin-api/create-project",projectObj,{
      headers:{Authorization: `Bearer ${token}`}
    })
    console.log(res)
    if(res.status===201){
    setResponse(res.data.message)
    setError("")
    setResponseError("")
    navigate("/admin")
    }
  }catch(err){
    console.log(err)
    setError(err.response.data.message)
  }
  }
  return (
    <div className='container-fluid'>
      <p className='display-6 text-center text-primary register-text'>Create Project</p>
      <hr></hr>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p>
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
      <div className=' mt-2 mb-5 p-3 shadow container bg-dark text-white rounded'>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5  mb-5 " >
        {/* project name */}
        <div className="mb-4">
          <label htmlFor="project_name" className="form-label fw-bold">Project Name</label>
          <input type="text" {...register('project_name', {required:"*project name required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.project_name && <p className="text-danger"><strong>{errors.project_name?.message}</strong></p>}
        </div>
        {/* client */}
        <div className="mb-4">
          <label htmlFor="client" className="form-label fw-bold">Client</label>
          <input type="text" {...register('client', {required:"*client required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.client && <p className="text-danger"><strong>{errors.client?.message}</strong></p>}
        </div>
        {/* client account manager */}
        <div className="mb-4">
          <label htmlFor="client_account_manager" className="form-label fw-bold">Client Account Manager</label>
          <input type="text" {...register('client_account_manager', {required:"*client account manager required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.client_account_manager && <p className="text-danger"><strong>{errors.client_account_manager?.message}</strong></p>}
        </div>
        {/* status of project */}
        <div className="mb-4">
          <label htmlFor="status_of_project" className="form-label fw-bold">Status of project</label>
          {/* <input type="text" {...register('status_of_project', {required:"*status of project required"})} className="form-control"></input> */}
          <select className="form-select"  {...register("status_of_project",{required:"status required"})}>
            <option selected>---select status of project---</option>
            <option value="Sales">Sales</option>
            <option value="Pres-Sales">Pre-Sales</option>
            <option value="Client Sign Off"> Client Sign Off</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed </option>
            <option value="Paused">Paused</option>
            <option value="Deferred">Deferred</option>
          </select>
          {/* validation error msg */}
          {errors.status_of_project && <p className="text-danger"><strong>{errors.status_of_project?.message}</strong></p>}
        </div>
        {/* start date */}
        <div className="mb-4">
          <label htmlFor="start_date" className="form-label fw-bold">Start Date</label>
          <input type="date" {...register('start_date', {required:"*start date required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.start_date && <p className="text-danger"><strong>{errors.start_date?.message}</strong></p>}
        </div>
        {/* overall project fitness indicator */}
        <div className="mb-4">
          <label htmlFor="overall_project_fitness_indicator" className="form-label fw-bold">overall project fitness indicator</label>
          {/* <input type="text" {...register('overall_project_fitness_indicator', {required:"*project fitness indicator required"})} className="form-control"></input> */}
          <select className="form-select" {...register('overall_project_fitness_indicator', {required:"*project fitness indicator required"})} >
            <option selected>---select fitness indicator---</option>
            <option value="red">Red</option>
            <option value="amber">Amber</option>
            <option value="green">Green</option>
          </select>
          {/* validation error msg */}
          {errors.overall_project_fitness_indicator && <p className="text-danger"><strong>{errors.overall_project_fitness_indicator?.message}</strong></p>}
        </div>
        {/* domain */}
        <div className="mb-4">
          <label htmlFor="Domain" className="form-label fw-bold">Domain</label>
          <input type="text" {...register('Domain', {required:"*domain required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.Domain && <p className="text-danger"><strong>{errors.Domain?.message}</strong></p>}
        </div>
        {/* type of project */}
        <div className="mb-4">
          <label htmlFor="type_of_project" className="form-label fw-bold">Type of project</label>
          {/* <input type="text" {...register('type_of_project', {required:"*type of project required"})} className="form-control"></input> */}
          <select className="form-select" {...register('type_of_project', {required:"*type of project required"})}>
              <option selected>---select type of project---</option>
              <option value="development">Development</option>
              <option value="devops">DevOps</option>
              <option value="testautomation">Test Automation</option>
              <option value="performanceTesting">Performance Testing</option>
              <option value="security">Security</option>
              <option value="sustenanceEngineering">Sustenance Engineering</option>
              <option value="mobility">Mobility</option>
              <option value="storage">Storage</option>       
          </select>

          {/* validation error msg */}
          {errors.type_of_project && <p className="text-danger"><strong>{errors.type_of_project?.message}</strong></p>}
        </div>
        {/* team size */}
        <div className="mb-4">
          <label htmlFor="team_size" className="form-label fw-bold">Team Size</label>
          <input type="number" {...register('team_size', {required:"*team size required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.team_size && <p className="text-danger"><strong>{errors.team_size?.message}</strong></p>}
        </div>
        {/* gdo head email */}
        <div className="mb-4">
          <label htmlFor="GdoHeadEmail" className="form-label fw-bold">GDO Head Email</label>
          <input type="text" {...register('GdoHeadEmail', {required:"*GDO head email required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.GdoHeadEmail && <p className="text-danger"><strong>{errors.GdoHeadEmail?.message}</strong></p>}
        </div>
        {/* project manager email */}
        <div className="mb-4">
          <label htmlFor="project_Manager_Email" className="form-label fw-bold">Project Manager Email</label>
          <input type="text" {...register('project_Manager_Email', {required:"*project manager email required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.project_Manager_Email && <p className="text-danger"><strong>{errors.project_Manager_Email?.message}</strong></p>}
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
export default CreateProject

















