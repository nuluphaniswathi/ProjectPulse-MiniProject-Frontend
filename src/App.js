//import logo from './logo.svg';
import './App.css';
import {createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom'
import RootLayout from './components/RootLayout';
import ErrorPage from './components/ErrorPage';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import AssignRole from './components/superadmin/AssignRole';
import GetUsers from './components/superadmin/GetUsers';
import SuperAdmin from './components/superadmin/SuperAdmin';
import AdminDashboard from './components/admin/AdminDashboard'
import GetResourceRequest from './components/admin/GetResourceRequest';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import GetProjects from './components/admin/GetProjects';
import CreateProject from './components/admin/CreateProject';
import GetSpecificProject from './components/admin/GetSpecificProject';
import GdoDashboard from './components/gdo/GdoDashboard';
import AddTeam from './components/gdo/AddTeam';
import RaiseResourceRequest from './components/gdo/RaiseResourceRequest';
import ProjectManagerDashboard from './components/projectmanager/ProjectManagerDashboard';
import RaiseConcerns from './components/projectmanager/RaiseConcerns';
import CreateProjectUpdate from './components/projectmanager/CreateProjectUpdate';
import UpdateProject from './components/admin/UpdateProject';


function App() {
  //create browserrouter obj
  const browserRouterObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/register",
          element:<Register/>

        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/super-admin",
          element:<SuperAdmin/>,
          children:[
            {
              path:"get-users",
              element:<GetUsers/>,
            },
            {
              path:"get-users/assign-role",
              element:<AssignRole/>
            },
           
            {
              path:"",
              element:<Navigate to="get-users" replace={true} />
            }

          ]
        },
       
        {
          path:"/admin",
          element:<AdminDashboard/>,
          children:[
            
            {
              path:"updateproject",
              element:<UpdateProject/>
            },
            {
              path:"create-project",
              element:<CreateProject/>
            },
            {
              path:"getprojectsbyadmin",
              element:<GetProjects/>
            },
            {
              path:"get-specific-project/:projectid",
              element:<GetSpecificProject/>
            },
          
            {
              path:"",
              element:<GetProjects/>

            },
           /* {
              path:"getprojectsbyadmin/updateproject",
              element:<UpdateProject/>
            },*/
            {
              path:"getresourcerequest",
              element:<GetResourceRequest/>
            }

        ]
        },
        {
          path:"/gdodashboard",
          element:<GdoDashboard/>,
          children:[
            {
              path:"addteam",
              element:<AddTeam/>
            },
            {
              path:"raise-resource-request",
              element:<RaiseResourceRequest/>
            },
            {
              path:"getprojectsbygdo",
              element:<GetProjects/>,
            },
            {
              path:"",
              element:<GetProjects/>
            },
            {
              path:"get-specific-project/:projectid",
              element:<GetSpecificProject/>
            }
           
          ]
        },
        {
          path:"/projectmanagerdashboard",
          element:<ProjectManagerDashboard/>,
          children:[ 
            {
              path:"raise-project-concerns",
              element:<RaiseConcerns/>
            },
            {
              path:"createprojectupdate",
              element:<CreateProjectUpdate/>
            },
            {
              path:"getprojectsbyprojectmanager",
              element:<GetProjects/>,
             
            },
            {
              path:"",
              element:<GetProjects/>
            },
            {
              path:"get-specific-project/:projectid",
              element:<GetSpecificProject/>
            }

          ]
        },
        {
          path:"/forgotpassword",
          element:<ForgotPassword/>

        },
        {
          path:"/resetpassword",
          element:<ResetPassword/>
        }
      ]   
    }
  ])
  return (
    <div>
      {/*provide to app */}
     <RouterProvider router={browserRouterObj}/>
     
    </div>
  );
}

export default App;
