import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const GetUsers = () => {
  //state for user
  let [users,setUsers]=useState([])
  
  let getUsers=async()=>{
    try{
      //query to get users data by super admin
      let res=await axios.get("http://localhost:4000/superadmin-api/users")
      console.log("getusers",res.data.payload)
      setUsers([...users,...res.data.payload])  
    }
    //if error thrown
    catch(err){
      console.log("err",err)
    }

  }
  useEffect(()=>{
    getUsers()
  },[])

  let navigate=useNavigate();
  //when user click on assingn role navigate to assignrole
  const assignrole=(userObj)=>{
    navigate("assign-role",{state:userObj})
  }
  return (
    <div>
        <div className='text-primary fs-1'>GetUsers</div>
        
      
        <br/>
        {/* no users */}
        {
          users.length===0&&<p className="display-4 text-danger">no users</p>
        }
        {/* if users exists then display the data */}
        <table className='table-responsive text-center mx-auto table table-striped  table-bordered mr-3' style={{width:"80%"}}>
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>Role</th>
              <th>AssignRole</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((userObj,index)=><tr key={index}>
                <td>{userObj.user_name}</td>
                <td>{userObj.email}</td>
                <td>{userObj.role}</td>
                {userObj.role!=null?<button className='btn btn-warning bg-warning  text-white m-2' onClick={()=>assignrole(userObj)}>ChangeRole</button>:
                <button className='btn btn-primary bg-primary text-white m-2' onClick={()=>assignrole(userObj)}>AssignRole</button> }
              </tr>)
            }
          </tbody>
        </table>
      
    </div>
  )
}

export default GetUsers
