import React, { useState,useContext } from "react";
import { database } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sigininsontext } from "../../../main"
import { useSelector, useDispatch } from 'react-redux';
import {isSignedin} from '../../../Redux/Store/Slices/Validation'

function Signin() {
  const dispatch=useDispatch();
  const dispayother=useSelector((state)=>state.validate)
    
    const {issignin,setIssignin} = useContext(sigininsontext);
    console.log(issignin)
 
  const navigate = useNavigate();
  const handlesubmit = (e, type) => {
    e.preventDefault();
    if (!e.target.email.value || !e.target.password.value) {
      toast.error("please enter email and password", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const email = e.target.email.value;

    const password = e.target.password.value;

    signInWithEmailAndPassword(database, email, password)
      .then((data) => {
        console.log(data);
        toast.success("Signin successfull", {
          position: "top-center",
          autoClose: 2000,
        });
        
        navigate("/Home");
        dispatch(isSignedin(true))
        // setIssignin(true)
        // console.log(issiginin)
      })
      .catch((err) => {
        toast.error(`Signin failed ${err}`, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };
  return (
    <div className=" mt-12 flex gap-44 px-4">
      <div className="text-center w-[35%] py-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-xl">
        <h1 className="text-3xl font-bold text-sky-400">Signin</h1>
        <br />
        <form onSubmit={(e) => handlesubmit(e)}>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            className="py-2 border-2 border-black w-[50%]"
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="py-2 border-2 border-black w-[50%]"
          />
          <br />
          <br />
          <button className="py-2 border-2  w-[40%] bg-blue-400 text-lg font-semibold">
            Signin
          </button>
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/Signup")}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
      <div>
        <img src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg" alt="" />
      </div>
    </div>
  );
}

export default Signin;
