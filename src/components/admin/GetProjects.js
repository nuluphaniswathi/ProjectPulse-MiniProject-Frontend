import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../css/GetProjects.css'

import { useSelector } from 'react-redux';

const GetProjects = () => {
  let {userObj}=useSelector(state=>state.login)
  let navigate=useNavigate();
  let [projects,setProjects]=useState([])
  let [deleteState,setDeleteState]=useState(false)
 
 
  let token=sessionStorage.getItem("token");
   //function to get projects
  const getProjectsByAdmin=async()=>{
    try{
      // checking role based on that get project details under respective role
      if(userObj.role==="admin")
      {
        let res=await axios.get(
          "http://localhost:4000/admin-api/admin/portfolio-dashboard",
          { headers: { Authorization: `Bearer ${token}` } }   
        );
        console.log("getprojects:",res.data.payload);
        setProjects(res.data.payload)
      }
      if(userObj.role==="gdohead")
      {
       let res=await axios.get("http://localhost:4000/gdoHead-api/projects/gdoemail",
       { headers: { Authorization: `Bearer ${token}` }});
       console.log("getprojects:",res.data.payload);
       setProjects(res.data.payload)
      }
      if(userObj.role==="projectmanager"){
        let res=await axios.get("http://localhost:4000/project-manager-api/projects/portfolio-dashboard/projectManagerEmail",
        { headers: { Authorization: `Bearer ${token}` }});
        console.log("getprojects:",res.data.payload);
        setProjects(res.data.payload)
      }}
      catch(err){
        console.log("error is:",err)
      }

  }


  //whenever first rendering complete useeffect calls
 
  useEffect(()=>{
    getProjectsByAdmin()

  },[deleteState])
  //navigate to specific project details
  const getProjectById=(project)=>{
    if(userObj.role==="admin"){
      navigate(`/admin/get-specific-project/${project.project_id}`,{state:project})
      
    }
    else if(userObj.role==="gdohead"){
      navigate(`/gdodashboard/get-specific-project/${project.project_id}`,{state:project})

    }
    else if(userObj.role==="projectmanager"){
      navigate(`/projectmanagerdashboard/get-specific-project/${project.project_id}`,{state:project})
    }
  
  }
  //update project details navigate to updateproject component
  const editProject=(project)=>{
    console.log("project:",project);  
    navigate("/admin/updateproject",{state:project})
  }

  const deleteProject=async(project)=>{
    try{
      //query to delete the project by admin
      let res=await axios.delete(`http://localhost:4000/admin-api/admin/projectId/${project.project_id}`,
    { headers: { Authorization: `Bearer ${token}` }})
    console.log(res)
    setDeleteState(true)

    }
    catch(err){
      console.log(err)
    }
   
    

  }
  return (
    <div>
{/* project Details Table */}
    
        <table className="container table table-responsive text-center mx-auto table-striped  table-bordered mr-3" style={{width:"30%"}}>
          <thead className="table-dark ">
            <tr>
              <th>ProjectId</th>
              <th>ProjectName</th>
              <th>Client</th>
              <th>clientAccountManager</th>
              <th>ProjectStatus</th>
              <th>startDate</th>
              <th>Type</th>
              <th>FitnessIndicator</th>
              <th>View</th>
              {userObj.role==="admin" && <th>Edit</th> }
              {userObj.role==="admin" && <th>Delete</th> }
              
            </tr>
          </thead>
          <tbody>
            {
              projects.map((project,index)=><tr key={index}><td >{project.project_id}</td>
                <td>{project.project_name}</td>
                <td>{project.client}</td>
                <td>{project.client_account_manager}</td>
                <td>{project.status_of_project}</td>
                <td>{project.start_date.slice(0,9)}</td>
                <td>{project.type_of_project}</td>
                <td>{project.overall_project_fitness_indicator}</td>
                <td onClick={()=>getProjectById(projects[index])}><button className='btn btn-success'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg>
               </button></td>
                {userObj.role==="admin" &&<td><button className='btn btn-warning' onClick={()=>editProject(projects[index])}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg></button></td>}
                {userObj.role==="admin" &&<td><button className='btn btn-danger' onClick={()=>deleteProject(projects[index])}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
                  </button></td>}
              </tr>)
            }
          </tbody>
        </table>
          
      
       
              
          
      

      
    </div>
  )
}

export default GetProjects
