import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
const AddTeam = () => {
    let {register,handleSubmit,formState:{errors},reset}=useForm();
     //get toekn from storage
  let token=sessionStorage.getItem("token")
  //state for error
  let [error,setError]=useState()
  //state for response error
  let [responseError,setResponseError]=useState("")
  //state for response
  let [response, setResponse]=useState("")
  console.log(response)
  const onSubmit=async(teamObj)=>{
    reset()
    try{
        let res=await axios.post("http://localhost:4000/gdoHead-api/team",teamObj,{
            headers:{Authorization: `Bearer ${token}`}
          })
    console.log("Addteam",res.data.payload)
    if(res.status===201){
    setResponse(res.data.message)
    setError("")
    setResponseError("")
    }
  }catch(err){
    console.log(err)
    setError(err.response.data.message)
  }
    }
  return (
     <div className='container-fluid'>
      <p className='display-6 text-center text-primary register-text'>Add Team</p>
      <hr></hr>
      {
        responseError ? <p className='text-danger fs-2 text-center fw-bold'>{responseError}</p> :  error && <p className='text-danger fs-2 text-center fw-bold'>{error}</p>
      }
      {
        response && <p className='text-success fs-2 text-center fw-bold'>{response}</p>
      }
      <div className='container mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mb-5 shadow mx-auto bg-dark text-white " style={{width:"50%"}}>
        {/* project Id */}
        <div className="mb-4">
          <label htmlFor="project_id" className="form-label fw-bold">ProjectId</label>
          <input type="number" {...register('project_id', {required:"*project id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.project_id && <p className="text-danger"><strong>{errors.project_id?.message}</strong></p>}
        </div>
        {/* employee Id */}
        <div className="mb-4">
          <label htmlFor="emp_id" className="form-label fw-bold">EmployeeId</label>
          <input type="number" {...register('emp_id', {required:"*Employee Id required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.emp_id && <p className="text-danger"><strong>{errors.emp_id?.message}</strong></p>}
        </div>

        {/* employee name */}
        <div className="mb-4">
          <label htmlFor="emp_name" className="form-label fw-bold">EmployeeName</label>
          <input type="text" {...register('emp_name', {required:"*Employee name required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.emp_name && <p className="text-danger"><strong>{errors.emp_name?.message}</strong></p>}
        </div>
        {/* role */}
        <div className="mb-4">
          <label htmlFor="role" className="form-label fw-bold">Role</label>
          {/* <input type="text" {...register('role', {required:"*Role is required"})} className="form-control"></input> */}
          <select className="form-select" {...register('role', {required:"*Role is required"})} >
            <option selected>--select role in the project--</option>
            <option value="QA">QA</option>
            <option value="Dev">DEV</option>
            <option value="Product">Product</option>
            <option value="management">Management</option>
            <option value="devops">Devops</option>
          </select>
          {/* validation error msg */}
          {errors.role && <p className="text-danger"><strong>{errors.role?.message}</strong></p>}
        </div>
         {/* start date */}
         <div className="mb-4">
          <label htmlFor="start_date" className="form-label fw-bold">Start Date</label>
          <input type="date" {...register('start_date', {required:"*start date required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.start_date && <p className="text-danger"><strong>{errors.start_date?.message}</strong></p>}
        </div>
         {/* End date */}
         <div className="mb-4">
          <label htmlFor="end_date" className="form-label fw-bold">End Date</label>
          <input type="date" {...register('end_date', {required:"*end date required"})} className="form-control"></input>
          {/* validation error msg */}
          {errors.end_date && <p className="text-danger"><strong>{errors.end_date?.message}</strong></p>}
        </div> 
        {/* status of project */}
        <div className="mb-4">
          <label htmlFor="status" className="form-label fw-bold">Status</label>
          {/* <input type="text" {...register('status', {required:"*status of project required"})} className="form-control"></input> */}
          <select className="form-select" {...register('status', {required:"*status of project required"})} >
            <option selected>--select status--</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            
          </select>

          {/* validation error msg */}
          {errors.status && <p className="text-danger"><strong>{errors.status?.message}</strong></p>}
        </div>
         {/* Billing Status */}
         <div className="mb-4">
          <label htmlFor="billing_status" className="form-label fw-bold">Billing Status</label>
          {/* <input type="text" {...register('billing_status', {required:"*Billing status required"})} className="form-control"></input> */}
          <select className="form-select" {...register('billing_status', {required:"*Billing status required*"})} >
            <option selected>--select billing status--</option>
            <option value="billed">Billed</option>
            <option value="buffer">Buffer</option> 
          </select>
          {/* validation error msg */}
          {errors.billing_status && <p className="text-danger"><strong>{errors.billing_status?.message}</strong></p>}
        </div>
         {/* Exposed to customer */}
         <div className="mb-4">
          <label htmlFor="exposed_to_customer" className="form-label fw-bold">Exposed to Customer</label>
          {/* <input type="text" {...register('exposed_to_customer', {required:"* required"})} className="form-control"></input> */}
          <select className="form-select" {...register('exposed_to_customer', {required:"*exposed_to_customer is required*"})} >
            <option selected>--Exposed to Customer--</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option> 
          </select>
          {/* validation error msg */}
          {errors.exposed_to_customer && <p className="text-danger"><strong>{errors.exposed_to_customer?.message}</strong></p>}
        </div>
         {/* allocation type */}
         <div className="mb-4">
          <label htmlFor="allocation_type" className="form-label fw-bold">Allocation Type</label>
          {/* <input type="text" {...register('allocation_type', {required:"*allocation_type is required"})} className="form-control"></input> */}
          <select className="form-select" {...register('allocation_type', {required:"*allocation_type is required*"})} >
            <option selected>--AllocationType--</option>
            <option value="permanent">Permanent</option>
            <option value="temporary">Temporary</option> 
          </select>
          {/* validation error msg */}
          {errors.allocation_type && <p className="text-danger"><strong>{errors.allocation_type?.message}</strong></p>}
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

export default AddTeam
