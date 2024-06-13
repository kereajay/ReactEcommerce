import React from 'react'
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

function Footer() {
  return (
    <div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-8 bg-orange-300 py-8 mt-20'>
        <div>
          <div><h1 className='text-2xl font-semibold'>Categories</h1></div>
          {/* <br /> */}
          <div>
            <ul type="none" className='text-lg'>
              <li>Home</li>
              <li>Cart</li>

            </ul>
          </div>
        </div>
       
        <div>
          <div>
            <div><h1 className='text-2xl font-semibold'>Customer Services</h1></div>
            <div>
              <ul type="none" className='text-lg'>
                <li>About</li>
                <li>Contact Us</li>
                <li>Return Policy</li>
                <li>Privacy</li>

              </ul>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div><h1 className='text-2xl font-semibold'>Social Media</h1></div>
            <br />
            <div>
              <ul type="none" className='flex gap-4 text-2xl '>
                <li className='hover:text-blue-400'><BsInstagram /></li>
                <li className='hover:text-blue-400'><BsLinkedin /></li>
                <li className='hover:text-blue-400'><BsTwitter /></li>
                <li className='hover:text-blue-400'><BsFacebook /></li>
                
               

              </ul>
            </div>
          </div>
        </div>
        
        <div>
          {/* <div><h1>We accept</h1></div> */}
          <div><img src="https://ecommerce-sk.vercel.app/pay.png" alt="" /></div>
        </div>
      </div>

    </div>
  )
}

export default Footer
