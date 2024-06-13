import React from 'react'
import { database } from '../Firebase/Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {isSignedin,userdetailsadd} from '../../../Redux/Store/Slices/Validation'
import { useSelector, useDispatch } from 'react-redux';



function Signup() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const handlesignup = (e) => {
        e.preventDefault()
        if (!e.target.email.value || !e.target.password.value) {

            toast.error("please enter email and password", { position: "top-center", autoClose: 2000 })
            return
        }
        const email = e.target.email.value
        const password = e.target.password.value
        createUserWithEmailAndPassword(database, email, password).then((data) => {
            console.log(data)
            navigate("/signin")
            toast.success("Signup successfully", { position: "top-center", autoClose: 2000 })
        }).catch((err) => {
            toast.error("mail id already exists please signin", {
                position: "top-center",
                autoClose: 2000
            })
            // alert(err.code)
            navigate("/Signin")
        })
    }

    //google signup
    const signupwithgoogle=()=>{
        try{
            const providr=new GoogleAuthProvider();
            signInWithPopup(database,providr).then((data)=>{
                console.log(data)
                navigate("/Home")
                dispatch(isSignedin(true))
                dispatch(userdetailsadd(data.user))

            }).catch((err)=>{
                console.log(err)
            })

        }
        catch(e){
            console.log(e)

        }

    }
    return (
        <>
            <div className=" mt-12 flex gap-44 px-4">

                <div className='text-center w-[35%] py-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-xl'>
                    <h1 className='text-3xl font-bold text-sky-400'>Signup</h1>
                    <br />
                    <form onSubmit={(e) => handlesignup(e)}>
                        <input type="text" placeholder='Enter Email' name='email' className='py-2 border-2 border-black w-[50%]' />
                        <br />
                        <br />
                        <input type="password" name='password' placeholder='Enter Password' className='py-2 border-2 border-black w-[50%]' />
                        <br />
                        <br />
                        <button className='py-2 border-2  w-[40%] bg-blue-400 text-lg font-semibold'>signup</button>
                        <br />
                        <p>if you have an account please go to <span onClick={() => navigate('/Signin')} className='text-blue-400  cursor-pointer'>signin</span></p>

                    </form>
                    <br />
                    <div>
                        <button className='py-2 border-2  w-[40%] bg-blue-400 text-lg font-semibold' onClick={signupwithgoogle}>Signup with google</button>
                    </div>
                </div>
                <div>
                    <img src="https://www.creativefabrica.com/wp-content/uploads/2019/05/Web-design-of-online-shop-and-ecommerce-by-OtpirusThree.jpg" alt=""  width={600}/>
                </div>
            </div>
        </>
    )
}

export default Signup
