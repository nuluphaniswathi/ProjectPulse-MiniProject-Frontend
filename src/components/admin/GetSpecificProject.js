import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailedProjectView from '../admin/DetailedProjectView'

const GetSpecificProject = () => {
    let {state}=useLocation()
    let {userObj}=useSelector(state=>state.login)
    console.log("state:",state)
    //let projectid=parseInt(params.project_id)
    //console.log("projectid:",projectid)
    
    let [updates,setupdates]=useState([])
    let [concerns,setconcerns]=useState([])
    let [details,setDetails]=useState({})
    let [team,setteam]=useState([])
    // state to store the project detailed view
    let [project,setProject]=useState({})
  
   

    let token=sessionStorage.getItem("token");
  const projectDetailedView=async()=>{
  


      try{ 
        if(userObj.role==="admin"){
        let res=await axios.get(
          `http://localhost:4000/admin-api/admin/portfolio-dashboard/projectId/${state.project_id}`,
          { headers: { Authorization: `Bearer ${token}` } }   
        );
       
        setDetails(res.data)
        // console.log("details",details);
        console.log("details:",res.data)
        console.log("projectupdates:",res.data.payload.project_updates)
      //  console.log("projectconcers:",res.data.payload.project_concerns)
      //   console.log("projectteamcoposition:",res.data.payload.team_compositions)
  
       setupdates(res.data.payload.project_updates)
        setconcerns(res.data.payload.project_concerns)
        setteam(res.data.payload.team_compositions)
        setProject(res.data.payload)
        console.log("projectdetailedview:",project)
        console.log("team",team);
        }
        if(userObj.role==="gdohead"){
          let res=await axios.get(
            `http://localhost:4000/gdoHead-api/projectId/${state.project_id}/gdoemail`,
            { headers: { Authorization: `Bearer ${token}` } }   
          );
         
          setDetails(res.data)
          console.log("details",details);
          console.log("detailsstate:",res.data.message)
          console.log("projectupdates:",res.data.payload.project_updates)
         console.log("projectconcers:",res.data.payload.project_concerns)
          console.log("projectteamcoposition:",res.data.payload.team_compositions)
    
         setupdates(res.data.payload.project_updates)
          setconcerns(res.data.payload.project_concerns)
          setteam(res.data.payload.team_compositions)
          setProject(res.data.payload)

          console.log("team",team);


        }
        if(userObj.role==="projectmanager"){
          let res=await axios.get(
            `http://localhost:4000/project-manager-api/projects/portfolio-dashboard/projectId/${state.project_id}`,
            { headers: { Authorization: `Bearer ${token}` } }   
          );
         
          setDetails(res.data)
          console.log("details",details);
          console.log("detailsstate:",res.data.message)
          console.log("projectupdates:",res.data.payload.project_updates)
         console.log("projectconcers:",res.data.payload.project_concerns)
          console.log("projectteamcoposition:",res.data.payload.team_compositions)
    
         setupdates(res.data.payload.project_updates)
          setconcerns(res.data.payload.project_concerns)
          setteam(res.data.payload.team_compositions)
          setProject(res.data.payload)
          console.log("team",team);

        }

        }
    
      catch(err){
        console.log("error is:",err)
      }

  }
  //whenever first rendering complete useeffect calls
 
  useEffect(()=>{
    projectDetailedView()

  },[])
  return (
    <div>
      <p className='display-6 text-primary text-center'>GetDetailedProjectView</p>
      <hr></hr>
      <div className='d-flex align-items-center'>
    <div className="container p-3 bg-info shadow text-white rounded mb-4">
      <h2 className="text-center fs-3">Team Size</h2>
      <h3 className="text-center display-6">{details.teamSize}</h3>
    </div>
    <div className="container p-3 bg-info text-white rounded m-4">
      <h2 className="text-center fs-3">ProjectFitness</h2>
      <h3 className="text-center display-6">{details.projectFitness}</h3>
    </div>
    <div className="container p-3 bg-info text-white rounded mb-4">
      <h2 className="text-center fs-3">concernIndicator</h2>
      <h3 className="text-center display-6">{details.concernIndicator}</h3>
    </div>
    </div>
    <div className='mb-3'>
      <DetailedProjectView project={project}/>
    </div>

      <div>
        <h2 className='text-center text-primary '>Team Composition</h2>
        {
          team.length===0?<p className='text-danger text-center fs-6'>No teamComposition</p>:(<table className="table table-bordered text-center mx-auto table table-striped table-hover table-bordered rounded" style={{width:"80%"}}>
          <thead className="table-dark ">
            <tr>
              <th>ProjectId</th>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>Role</th>
              <th>startDate</th>
              <th>Status</th>
              <th>BillingStatus</th>
          
              <th>allocationType</th>
            </tr>
          </thead>
          <tbody>
              {
              team.map((teamObj,index)=><tr key={index} >
                <td>{teamObj.project_id}</td>
                <td>{teamObj.emp_id}</td>
                <td>{teamObj.emp_name}</td>
                <td>{teamObj.role}</td>
                <td>{teamObj.start_date.slice(0,9)}</td>
                <td>{teamObj.status}</td>
                <td>{teamObj.billing_status}</td>
                <td>{teamObj.allocation_type}</td>
              </tr>)
            }  
          </tbody>
        </table>
          )
        }
      
      
          <h2 className='text-center text-primary'>projectupdates</h2>
         {
          updates.length===0?<p className='fs-3 text-danger'>No project updates</p>:( <table className="table table-bordered text-center mx-auto table table-striped table-hover table-bordered rounded" style={{width:"80%"}}>
          <thead className="table-dark ">
            <tr>
              <th>ProjectId</th>
              <th>statusUpdate</th>
              {/* <th>ScheduleStatus</th> */}
              <th>resourcingStatus</th>
              <th>QualityStatus</th>
            </tr>
          </thead>
          <tbody>
           {
              updates.map((updatesObj,index)=><tr key={index} >
                <td>{updatesObj.project_id}</td>
                <td>{updatesObj.status_update}</td>
                {/* <td>{updatesObj.shedule_status}</td> */}
                <td>{updatesObj.resourcing_status}</td>
                <td>{updatesObj.quality_status}</td>
              </tr>)
            } 
          </tbody>
        </table> 

          )
         }
      </div>



      <h2 className='text-center text-primary '>projectConcerns</h2>
          {
          concerns.length===0?<p className='fs-3 text-danger'>No project concerns</p>:( <table className="table table-bordered text-center mx-auto table table-striped table-hover table-bordered rounded" style={{width:"80%"}}>
          <thead className="table-dark ">
            <tr>
              <th>ProjectId</th>
              <th>ConcernDescription</th>
              <th>RaisedBy</th>
              <th>severity</th>
              <th>RaisedInternally</th>
            </tr>
          </thead>
          <tbody>
            {
              concerns.map((concernObj,index)=><tr key={index} >
                <td>{concernObj.project_id}</td>
                <td>{concernObj.concern_desc}</td>
                <td>{concernObj.raised_by}</td>
                <td>{concernObj.severity}</td>
                <td>{concernObj.concern_raised_internally}</td>
              </tr>)
            }
          </tbody>
        </table> 

          )
         } 

     

      
    </div>
  )
}

export default GetSpecificProject
