import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoSunny } from "react-icons/io5";
import { database } from '../../Pages/Authorization/Firebase/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isSignedin } from '../../Redux/Store/Slices/Validation'
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from 'react';
function Header() {
  const navbarref = useRef();
  const dispatch = useDispatch();
  const dispayother = useSelector((state) => state.validate)
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handletheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // console.log(dispayother.isLogedin)
  //handle signout
  const handlesignout = () => {

    signOut(database).then(() => {
      navigate("/Signin")
    }).catch((err) => {
      console.log(err)
    })

  }
  return (
    <>
      <div className='flex flex-row justify-between py-3 px-8 bg-orange-300'>
        <div className='flex flex-row gap-2'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsV4PywZYH71kRCOn3UecYOEdx2Q4jf_uGCab9BwoWw4RRKDTPoJg9_kkBlzkWfpq9uo&usqp=CAU" alt="" width={30} className='rounded-full ' />
          <h1 className='text-xl font-bold text-white'>ShopVoyage</h1>
        </div>
        <div>
          {
            dispayother.isLogedin == true ? (
              <>
                <ul type="none" className='lg:flex md:hidden sm:hidden   flex-row gap-10 items-center text-xl text-white font-semibold '>

                  <li><Link to="/Home">Home</Link></li>
                  <li><Link to="/Cart">Cart</Link></li>
                  <li onClick={handlesignout}>Signout</li>
                  <li className='flex gap-1 items-center'>{dispayother.userdetails.displayName} <img src={dispayother.userdetails.photoURL} alt="" className='rounded-full w-10' /></li>
                  <li></li>
                  <li onClick={handletheme}><IoSunny /></li>

                </ul>
                <h1 className='lg:hidden md:visible sm:visible text-2xl' onClick={() => navbarref.current.classList.toggle("hidden")}><GiHamburgerMenu /></h1>

              </>
            ) : ""
          }
        </div>

      </div>
      <div >
        <ul type="none" className='lg:hidden flex flex-col gap-y-6 text-xl font-semibold bg-orange-300 text-white py-4 px-2' id="navbaronlcick" ref={navbarref}>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/Cart">Cart</Link></li>
          <li onClick={handlesignout}>Signout</li>
          <li onClick={handletheme}><IoSunny /></li>
          <li className='flex gap-1 items-center'>{dispayother.userdetails.displayName} <img src={dispayother.userdetails.photoURL} alt="" className='rounded-full w-10' /></li>
          <li></li>

        </ul>
      </div>

    </>
  )
}

export default Header
