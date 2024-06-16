import Reactm, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function Details() {
    const navigate = useNavigate()
    let ratingarray = []
    let rating = 0
    const [data, setData] = useState({})
    const [review, setReview] = useState([])
    // const[rating,setRating]=useState(0)
    const { id } = useParams()
    useEffect(() => {
        fetchData()
        reviewdata()
    }, [])
    

        rating = Math.floor(data.product_star_rating)
        for (let i = 0; i < rating; i++) {
        ratingarray.push("⭐")

    }



    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${id}&country=US`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ac18448241msh25df8f16272c337p1cf69ajsn2b65461ef39e',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };
    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.data);
            setData(result.data)
        } catch (error) {
            console.error(error);
        }
    }

//Reviews
const urlr = `https://real-time-amazon-data.p.rapidapi.com/product-reviews?asin=${id}&country=US&sort_by=TOP_REVIEWS&star_rating=ALL&verified_purchases_only=false&images_or_videos_only=false&current_format_only=false&page=1`;
const optionsr = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'eb253502a4msh9d968a965eb48c3p125caejsn4d0ff7834478',
		'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
	}
};
async function reviewdata(){
try {
	const response = await fetch(urlr, optionsr);
	const result = await response.json();
	console.log(result);
    setReview(result.data.reviews)
} catch (error) {
	console.error(error);
}
}

//voice handling
const handlevoice=()=>{
    if(data){
        const text=data.product_title
        const val=new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(val)
    }
}

    return (
        <>
            {
                data ? (
                    <>
                        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 px-8 mt-10'>
                            <div>
                                <img src={data.product_photo} alt="" />
                                <br />
                                <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                                    {data.product_photos &&

                                        data.product_photos.map((item) => {
                                            return (
                                                <>
                                                    <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-4' >
                                                        <img src={item} alt="" className='w-24 m-auto' />
                                                    </div>
                                                </>
                                            )

                                        })
                                    }
                                </div>

                            </div>
                            <div className='pt-10'>

                                <h1 className='text-3xl font-bold'>{data.product_title}</h1>
                                <br />
                                <h1 className='text-xl font-semibold italic text-green-500'>Price: {data.product_price}$</h1>
                                <br />
                                <p className='text-2xl'>{ratingarray}</p>
                                <br />
                               
                                <p className='font-semibold'>{data.
                                    product_availability
                                }</p>
                                <br />
                                <button onClick={()=>navigate(`/Cart/${data.asin}`)} className='bg-orange-300 py-1 px-4 font-semibold rounded-xl'>Add➕</button>
                                <br />
                                <button onClick={handlevoice} className='text-2xl'>▶️</button>

                                <h1><span className='font-semibold'>Description And Information:-</span>
                                    <br />
                                    {data.product_description}
                                    <br />
                                 </h1>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className='px-16'>
                            <h1 className='text-3xl font-bold m-auto text-center'>Reviews</h1>
                            <br />
                            <br />
                            {review ?(
                                review.map((item)=>{
                                    return(
                                        <>
                                            <div className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-4 px-4'>
                                                <h1 className='text-2xl font-semibold'>{item.review_author}</h1>
                                                <br />
                                                <h2 className='text-xl font-semibold'>{item.review_title}</h2>
                                                
                                                <p>{item.review_comment}</p>

                                            </div>
                                            <br />
                                            <br />
                                        </>
                                    )
                                })
                            ):
                            <h1 className='text-3xl font-bold m-auto text-center'>No Reviews</h1>
                            }
                            
                        </div>
                    </>
                ) : null
            }
        </>
    )
}

export default Details
