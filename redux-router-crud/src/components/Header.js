import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { togglebtn } from "../state/authSlice";


const Header = () => {
  const dispatch=useDispatch();
  const {isLoggedin}=useSelector((state)=>state.auth);
  return (
    <div className="header">
      <h1>crud app</h1>
      <ul className="nav">
        <li>
          <NavLink end to="/">Home</NavLink >
        </li>
        <li className="add">
          <NavLink  to="post/add">Add Post</NavLink >
        </li>
        <li className="login" onClick={()=>dispatch(togglebtn())}>{isLoggedin?"logout":"login"}</li>
      </ul>
    </div>
  )
};

export default Header;
