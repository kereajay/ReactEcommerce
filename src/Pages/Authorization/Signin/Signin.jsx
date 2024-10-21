import React, { useContext } from "react";
import { database } from "../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sigininsontext } from "../../../main";
import { useSelector, useDispatch } from 'react-redux';
import { isSignedin } from '../../../Redux/Store/Slices/Validation';

function Signin() {
  const dispatch = useDispatch();
  const { issignin, setIssignin } = useContext(sigininsontext);
  console.log(issignin);
 
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please enter email and password", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    signInWithEmailAndPassword(database, email, password)
      .then((data) => {
        console.log(data);
        toast.success("Signin successful", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/Home");
        dispatch(isSignedin(true));
      })
      .catch((err) => {
        toast.error(`Signin failed: ${err.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-44 gap-10 p-4 mt-12">
      <div className="bg-white w-full max-w-md lg:w-[35%] text-center py-10 px-6 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-sky-400 mb-6">Signin</h1>
        <form onSubmit={handlesubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            className="py-2 px-3 border-2 border-gray-300 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="py-2 px-3 border-2 border-gray-300 rounded w-full"
          />
          <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
            Signin
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => navigate("/Signup")}
          >
            Signup
          </span>
        </p>
      </div>
      <div className="hidden lg:block">
        <img
          src="https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg"
          alt="Signin illustration"
          width={600}
        />
      </div>
    </div>
  );
}

export default Signin;
