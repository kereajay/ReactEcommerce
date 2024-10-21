import React from 'react'
import { database } from '../Firebase/Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { isSignedin, userdetailsadd } from '../../../Redux/Store/Slices/Validation'
import { useSelector, useDispatch } from 'react-redux';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handlesignup = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            toast.error("Please enter email and password", { position: "top-center", autoClose: 2000 });
            return;
        }

        createUserWithEmailAndPassword(database, email, password)
            .then((data) => {
                console.log(data);
                navigate("/signin");
                toast.success("Signup successfully", { position: "top-center", autoClose: 2000 });
            })
            .catch((err) => {
                toast.error("Email already exists, please sign in", { position: "top-center", autoClose: 2000 });
                navigate("/signin");
            });
    }

    const signupwithgoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(database, provider)
            .then((data) => {
                console.log(data);
                navigate("/home");
                dispatch(isSignedin(true));
                dispatch(userdetailsadd(data.user));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-44 gap-10 p-4 mt-12">
            <div className="bg-white w-full max-w-md lg:w-[35%] text-center py-10 px-6 shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-sky-400 mb-6">Signup</h1>
                <form onSubmit={handlesignup} className="space-y-6">
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
                        Signup
                    </button>
                </form>
                <p className="mt-4">Already have an account? <span onClick={() => navigate('/signin')} className="text-blue-400 cursor-pointer">Signin</span></p>

                <div className="mt-6">
                    <button
                        className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
                        onClick={signupwithgoogle}
                    >
                        Signup with Google
                    </button>
                </div>
            </div>
            <div className="hidden lg:block">
                <img src="https://www.creativefabrica.com/wp-content/uploads/2019/05/Web-design-of-online-shop-and-ecommerce-by-OtpirusThree.jpg" alt="Signup illustration" width={600} />
            </div>
        </div>
    );
}

export default Signup;
