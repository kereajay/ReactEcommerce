import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Add_to_cart, Remove_cart } from "../../Redux/Store/Slices/Cartslice";

function Cart() {
  let total = 0;
  const displaycart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch product data if ID exists.
  useEffect(() => {
    if (id && !isProductInCart(id)) {
      cartdata();
    }
  }, [id]);
  const isProductInCart = (productId) => {
    return displaycart.cartItems.some((item) => item.asin === productId);
  };

  // Define the API URL.
  const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${id}&country=US`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "64bf17bc59mshe1c607373cdbdefp157212jsn896ee1b8af20",
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  // Fetch product details and dispatch to Redux store.
  async function cartdata() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result && result.data) {
        dispatch(Add_to_cart(result.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="py-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          {displaycart.cartItems.length > 0 ? (
            <>
              {displaycart.cartItems.map((item) => (
                <div
                  key={item.asin}
                  className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full lg:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden px-6 py-6 m-auto mb-6 dark:bg-gray-800 dark:shadow-white"
                >
                  <img
                    src={item.product_photo}
                    alt={item.product_title}
                    className="w-28 object-cover m-auto"
                  />
                  <div className="flex flex-col justify-center">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {item.product_title}
                    </h1>
                    <h3 className="text-xl font-semibold text-green-500 mt-2">
                      {item.product_price}
                    </h3>
                    <button
                      onClick={() => dispatch(Remove_cart(item.asin))}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {displaycart.cartItems &&
                displaycart.cartItems.map((item) => {
                  // Check if item.product_price exists before processing
                  if (item.product_price) {
                    let cartproduct = item.product_price.split(" ");

                    if (cartproduct[0] === "$") {
                      cartproduct = Number(cartproduct.slice(1).join(""));
                    } else {
                      cartproduct = Number(item.product_price);
                    }
                    total += cartproduct;
                  }
                })}

              <br />

              <div className="mt-6">
                <div className="shadow-[0px_20px_100px_10px_#fbd38d] dark:shadow-[0px_20px_100px_10px_#fbd38d] rounded-lg text-center p-5 w-full lg:w-1/3 m-auto">
                  <h1 className="text-2xl font-semibold">
                    Product Price: ${total.toFixed(2)}
                  </h1>
                  {total < 50 ? (
                    <>
                      <h1 className="text-2xl mt-2">Shipping: $5.00</h1>
                      <h1 className="text-2xl font-bold mt-2">
                        Total: ${(total + 5).toFixed(2)}
                      </h1>
                    </>
                  ) : (
                    <>
                      <h1 className="text-2xl mt-2">Shipping: Free</h1>
                      <h1 className="text-2xl font-bold mt-2">
                        Total: ${total.toFixed(2)}
                      </h1>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-2xl font-semibold text-gray-700 dark:text-gray-100 mt-10">
              Your cart is empty.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
