import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./component/Authentication/Login";
import Dashboard from "./component/DashBoard/Dashboard";
import AddUser from "./component/DashBoard/pages/AddUser";
import UserManagement from "./component/DashBoard/pages/UserManagement";
import ManagerScreen from "./component/Manager/ManagerScreen";
import SupervisorScreen from "./component/Supervisor/SupervisorScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { NotFound } from "./component/utils/base";


function App() {
  const { loginUser } = useSelector(state => state.UserSlice); //redux toolkit store 

  return (
    <div className="MainBody">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {loginUser?.role_type === 1 ?
            <Route path="/managerScreen" element={<ManagerScreen />} />
            :
            loginUser?.role_type === 2 &&
            <Route path="/supervisorScreen" element={<SupervisorScreen />} />}

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<UserManagement />} />
            <Route path="allUser" element={<UserManagement />} />
            <Route path="adduser" element={<AddUser />} />
          </Route>

          <Route path="/" element={<Dashboard />} />
          <Route path='*' exact={true} element={<NotFound/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
