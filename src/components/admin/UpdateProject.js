import React,{useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';



const UpdateProject = () => {
  let {state}=useLocation();
  console.log(state);
  let navigate=useNavigate();
  //console.log(state)
  let token=sessionStorage.getItem("token");
  let {register,formState:{errors},handleSubmit,setValue}=useForm()
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //state for response
  let [response, setResponse]=useState("")

  useEffect(()=>{
    setValue("project_name",state.project_name)
    setValue("client",state.client)
    setValue("client_account_manager",state.client_account_manager)
    setValue("status_of_project",state.status_of_project)
    setValue("start_date",state.start_date)
    setValue("overall_project_fitness_indicator",state.overall_project_fitness_indicator)
    setValue("Domain",state.Domain)
    setValue("type_of_project",state.type_of_project)
    setValue("GdoHeadEmail",state.GdoHeadEmail)
    setValue("project_Manager_Email",state.project_Manager_Email)
    
  },[])

  const onSubmit=async(projectObj)=>{
    try{
      let res=await axios.put(`http://localhost:4000/admin-api/admin/projectId/${state.project_id}`,projectObj,
        { headers: { Authorization: `Bearer ${token}` }}
      )
      console.log(res)
      if(res.status===200){
      setResponse(res.data.message)
      setError("")
      setResponseError("")
      navigate("/admin")

    }
  }
    catch(err){
      console.log(err)
    setError(err.response.data.message)
    }

  }
  return (
    <div>
       <p className='display-6 text-center text-primary  fw-bold register-text'>UpdateProject</p>
      <hr></hr>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p>
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
    {/* useredit form */}
      <form  onSubmit={handleSubmit(onSubmit)}className="mt-5 mb-5 p-3 shadow container bg-dark text-white  rounded " >
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
          <input type="text" {...register('status_of_project', {required:"*status of project required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.status_of_project && <p className="text-danger"><strong>{errors.status_of_project?.message}</strong></p>}
        </div>
        
        {/* overall project fitness indicator */}
        <div className="mb-4">
          <label htmlFor="overall_project_fitness_indicator" className="form-label fw-bold">overall project fitness indicator</label>
          <input type="text" {...register('overall_project_fitness_indicator', {required:"*project fitness indicator required"})} className="form-control"></input>
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
          <input type="text" {...register('type_of_project', {required:"*type of project required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.type_of_project && <p className="text-danger"><strong>{errors.type_of_project?.message}</strong></p>}
        </div>
        {/* team size */}
        
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

  )
}

export default UpdateProject



