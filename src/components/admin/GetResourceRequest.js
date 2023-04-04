import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
const GetResourceRequest = () => {
  //state for resource requests
  let [resourceRequests,setResourceRequests]=useState([])
  //to get curent state 
  let {userObj}=useSelector(state=>state.login)
  //get token from session storage
  let token=sessionStorage.getItem("token");


  const getResourceRequests=async()=>{
    try{
      let res=await axios.get("http://localhost:4000/admin-api/admin/resourcerequest",
      {
        headers:{Authorization:`Bearer ${token}`}
      })
      console.log("ResourceRequests",res.data)
      setResourceRequests([...resourceRequests,...res.data.payload])
  
    }
    catch(err){
      console.log(err)
  
    }

  }
 
  useEffect(()=>{
    getResourceRequests();

  },[])


  return (
    <div>
      <table className="table table-responsive text-center mx-auto table-striped  table-bordered mr-3" style={{width:"80%"}}>
          <thead className="table-dark ">
            <tr>
              <th>GDOEmail</th>
              <th>ProjectId</th>
              <th>RequestDescription</th>             
            </tr>
          </thead>
          <tbody>
             {
              resourceRequests.map((resourcereqObj,index)=><tr>
                <td>{resourcereqObj.gdoemail}</td>
                <td>{resourcereqObj.project_id}</td>
                <td>{resourcereqObj.request_desc}</td>
                
              
                
              </tr>)
            } 
          </tbody>
        </table>


      
    </div>
  )
}

export default GetResourceRequest
