import { Route, Routes } from "react-router-dom";
import Entery from "./entry";
import Home from "./home";
import AllWorkers from "./workers/allWorkers";
import AllRoles from "./Role/allRoles";
import AddRole from "./Role/addRole";
import AddWorker from "./workers/addWorker";
import  Login  from "./manager/login";
import Contact from "./contact";
import HomePage from "./homePage";
const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workers" element={<AllWorkers />} />
        <Route path="/roles" element={<AllRoles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/worker" element={<AddWorker />} />
        <Route path="/addRole" element={<AddRole />} />        
      </Routes>
    </>
  );
};

export default Body;
