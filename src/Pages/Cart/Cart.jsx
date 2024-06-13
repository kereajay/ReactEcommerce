import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Add_to_cart, Remove_cart } from '../../Redux/Store/Slices/Cartslice'

function Cart() {
  let total = 0;

  const displaycart = useSelector((state) => state.cart)
  const [data, setData] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      cartdata()
    }
    // console.log(data)
    // localStorage.setItem("data",JSON.stringify(data))

  }, [])
  const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${id}&country=US`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '04484b2c5bmsh4f79190b144fab8p1b8a81jsnaf5a505628d3',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };
  async function cartdata() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // console.log(result);
      dispatch(Add_to_cart(result.data))
      return result

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className=''>
        {
          displaycart.cartItems.map((itemp) => {
            return (
              <>
                <br />
                <div className='grid lg:grid-cols-2 w-[70%] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] px-4 py-4 m-auto dark:shadow-white'>
                  <img src={itemp.product_photo} alt="" className='w-52' />
                  <div>

                    <h1 className='text-xl font-semibold mt-10'>{itemp.product_title}</h1>
                    <br />
                    <h3 className='text-xl font-semibold text-green-400'>{itemp.product_price}</h3>
                    <br />
                    <br />
                    <button onClick={() => dispatch(Remove_cart(itemp.asin))} className='bg-red-400 text-white px-4 py-2 rounded-2xl'>Remove</button>
                  </div>
                </div>
                <br />

              </>
            )
          })
        }
        {
          displaycart.cartItems.map((item) => {
            let cartproduct = item.product_price.split("")
            if (cartproduct[0] === "$") {
              cartproduct = Number(cartproduct.slice(1).join(""))
              console.log(cartproduct)

              total += cartproduct;
            }
            else {
              total += Number(item.product_price)
            }
            // let =Number(item.product_price)
          }
          )

        }
        <br />
        <div className=''>
          <div className=' m-auto w-[30%] bg-yellow-300 py-2 px-4 '>
            {
              total < 50 ? (
                <>
                  <h1 className='text-2xl '>Product-price:- ${total}</h1>
                  <h1 className='text-2xl '>Shipping :- 5</h1>
                  <h1 className='text-2xl'>Total :- ${total+5}</h1>
                </>


              ) : (    <>
                  <h1 className='text-2xl '>Shipping :- Free</h1>

              <h1 className='text-2xl'>Total :- ${total}</h1>
              </>
              )

            }


          </div>
        </div>
      </div>
    </>

  )
}

export default Cart
