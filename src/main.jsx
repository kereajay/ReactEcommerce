import React,{createContext,useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom'
import Header from './Components/Header/Header.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Pages/Authorization/Signup/Signup'
import Signin from './Pages/Authorization/Signin/Signin'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import Footer from './Components/Footer/Footer'
import { Provider } from 'react-redux'
import {store} from './Redux/Store/Store.js'
import Phone from './Pages/Home/Innerpages/Phone.jsx'
import Mensfashion from './Pages/Home/Innerpages/Mensfashion.jsx'
import Details from './Pages/Home/Innerpages/Details.jsx'
import WomenFashion from './Pages/Home/Innerpages/WomenFashion.jsx'
import FashionBoys from './Pages/Home/Innerpages/FashionBoys.jsx'
import FashionGirls from './Pages/Home/Innerpages/FashionGirls.jsx'
import Fashionbaby from './Pages/Home/Innerpages/Fashionbaby.jsx'
import Electronics from './Pages/Home/Innerpages/Electronics.jsx'
import Grocery from './Pages/Home/Innerpages/Grocery.jsx'
import Musicg from './Pages/Home/Innerpages/Musicg.jsx'
import Toys from './Pages/Home/Innerpages/Toys.jsx'
import Prime from './Pages/Home/Innerpages/Prime.jsx'
import Appliances from './Pages/Home/Innerpages/Appliances.jsx'



 export const sigininsontext=createContext()
const Maina=(()=>{
  const [issignin,setIssignin]=useState(false)
  return(
    <>
    {/* <Signup/> */}
    <sigininsontext.Provider value={{issignin,setIssignin}}>
  
    <Provider store={store}>
    <Header/>
    <Outlet/>
    <Footer/>
    <ToastContainer/>
    </Provider>
    </sigininsontext.Provider>
    {/* <App/> */}

    </>
  )
})
const routera=createBrowserRouter([
  {
    path:'/',
    element:<Maina/>,
    children:[
      {
        path:'/',
        element:<Signup/>
        
      },
      {
        path:'/Home',
        element:<Home/>

      },
      {
        path:'/Cart',
        element:<Cart/>
      },
      {
        path:'/Cart/:id',
        element:<Cart/>
      },
      {
        path:'/Signin',
        element:<Signin/>
      },
      {
        path:'/Signup',
        element:<Signup/>
      },{
        path:'/phone',
        element:<Phone/>
      },{
        path:'/Mensfashion',
        element:<Mensfashion/>
      },{
        path:'/Details/:id',
        element:<Details/>
      },{
        path:'/WomenFashion',
        element:<WomenFashion/>
      }
      ,{
        path:'/FashionBoys',
        element:<FashionBoys/>
      },{
        path:'/FashionGirls',
        element:<FashionGirls/>

      },{
        path:'/Fashionbaby',
        element:<Fashionbaby/>
      },
      {
        path:'/Electronics',
        element:<Electronics/>
      },{
        path:'/Grocery',
        element:<Grocery/>
      },
      {
        path:'/Musicg',
        element:<Musicg/>
      },{
        path:'/Toys',
        element:<Toys/>
      },{
        path:'/Prime',
        element:<Prime/>
      },{
        path:'/Appliances',
        element:<Appliances/>
      }
    
    ]
  }
])
const root =ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={routera}/>)
