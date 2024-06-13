import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetToysSearchQuery } from '../../../Redux/Store/Slices/Amazon'
import Load from '../../Loading/Load'

function Toys() {
    const navigate=useNavigate()

    const { data, error, isLoading } = useGetToysSearchQuery('search?query=toys-ans-games&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL')
    return (
        <div>
            <div className="py-5">
                {error ? (
                    <>Oh no, there was an error</>
                ) : isLoading ? (
                    <Load/>
                ) : data ? (
                    <>
                        {
                            data.data.products.map((item) => {
                                return (
                                    <>
                                        <div>
                                            <div className='px-2 py-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex gap-4 w-[70%] m-auto dark:shadow-white/80 ' >


                                                <div>
                                                    <img className='w-28 object-cover m-auto' src={item.
                                                        product_photo
                                                    } alt="" />
                                                </div>
                                                <div>
                                                    <h1 className='text-xl font-semibold'>{item.product_title}</h1>
                                                    <h1 className='font-semibold text-green-400 text-xl'>{item.product_price
                                                    }  </h1>
                                                    <h3 className='line-through italic '>{item.
                                                        product_minimum_offer_price
                                                    }</h3>
                                                    <button onClick={()=>navigate(`/Cart/${item.asin}`)} className='bg-orange-300 py-1 px-2 font-semibold rounded-xl'>Add➕</button>
                                                </div>
                                            </div>
                                            <br />
                                            <br />


                                        </div>
                                    </>
                                )
                            })
                        }
                    </>
                ) : null}
            </div>

        </div>
    )
}

export default Toys

