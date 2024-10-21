import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { toast } from "react-toastify";
import "react-multi-carousel/lib/styles.css";
import { useGetToysSearchQuery } from "../../Redux/Store/Slices/Amazon";
import Load from "../Loading/Load";

function Home() {
  const [categorey, setCategorey] = useState();
  const [inputval, setInputval] = useState("");
  const navigate = useNavigate();
  const [homedata, setHomedata] = useState([]);
  const [searchdata, setSearchdata] = useState([]);

  useEffect(() => {
    homealldata();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Category API Call
  const url =
    "https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "64bf17bc59mshe1c607373cdbdefp157212jsn896ee1b8af20",
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  async function homealldata() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setHomedata(result.data.products);
      setSearchdata(result.data.products);
    } catch (error) {
      console.error(error);
    }
  }

  const { data, error, isLoading } = useGetToysSearchQuery(
    `search?query=${categorey}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL`
  );

  return (
    <>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all 0.5s ease"
        transitionDuration={2000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0e4fae4d5fcab33b.jpg?q=20"
            alt=""
            className="w-full"
          />
        </div>
        <div>
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1f25201ced5d720d.jpg?q=20"
            alt=""
            className="w-full"
          />
        </div>
        <div>
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/f241e768f8367561.jpg?q=20"
            alt=""
            className="w-full"
          />
        </div>
        <div>
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/cc633426b89ad841.png?q=20"
            alt=""
            className="w-full"
          />
        </div>
      </Carousel>

      <br />
      <div className="text-center">
        <input
          type="search"
          onChange={(e) => setInputval(e.target.value)}
          className="w-1/2 px-4 py-1 rounded-xl outline-none border-2 border-black m-auto"
          placeholder="Search..."
        />
      </div>

      <br />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4">
        {searchdata &&
          searchdata
            .filter((item) =>
              inputval === ""
                ? item
                : item.product_title
                    .toLowerCase()
                    .includes(inputval.toLowerCase())
            )
            .map((item) => (
              <div
                className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-4 dark:shadow-white"
                key={item.asin}
              >
                <div
                  onClick={() => navigate(`/Details/${item.asin}`)}
                  className="w-48 m-auto"
                >
                  <img
                    src={item.product_photo}
                    alt=""
                    className="h-48 m-auto object-contain"
                  />
                </div>
                <div className="px-4">
                  <h1 className="text-xl font-bold">{item.product_title}</h1>
                  <br />
                  <h1 className="text-xl font-semibold italic text-green-500">
                    Price: {item.product_price}
                  </h1>
                  <br />
                  <button
                    onClick={() => navigate(`/Cart/${item.asin}`)}
                    className="px-4 py-1 font-semibold bg-orange-300 rounded-xl"
                  >
                    Add➕
                  </button>
                </div>
              </div>
            ))}
      </div>

      <br />
      <div className="px-4">
        <h1 className="text-3xl font-bold text-center">Product Categories</h1>
        <select
          name="categories"
          onChange={(e) => setCategorey(e.target.value)}
          value={categorey}
          className="px2 border-2 w-44 py-2"
        >
          <option value="toys-ans-games">Toys & Games</option>
          <option value="appliances">Appliances</option>
          <option value="electronics">Electronics</option>
          <option value="Phone">Phones</option>
          <option value="fashion_baby">Baby</option>
          <option value="fashion_boys">Boys</option>
          <option value="fashion_girls">Girls</option>
          <option value="fashion_women">Women</option>
          <option value="fashion_men">Men</option>
          <option value="grocery">Grocery</option>
        </select>
        <br />
        <div className="py-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <Load />
          ) : data ? (
            data.data.products.map((item) => (
              <div key={item.asin}>
                <div className="h-72 px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex gap-4 dark:shadow-white/80">
                  <div
                    onClick={() => navigate(`/Details/${item.asin}`)}
                    className=""
                  >
                    <img
                      className="w-48 h-48 object-contain m-auto"
                      src={item.product_photo}
                      alt=""
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold">
                      {item.product_title}
                    </h1>
                    <h1 className="font-semibold text-green-400 text-xl">
                      {item.product_price}
                    </h1>
                    <h3 className="line-through italic">
                      {item.product_minimum_offer_price}
                    </h3>
                    <button
                      onClick={() => navigate(`/Cart/${item.asin}`)}
                      className="bg-orange-300 py-1 px-2 font-semibold rounded-xl"
                    >
                      Add➕
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] px-4  ">
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Phone")}
        >
          <h1 className="text-2xl font-bold text-center">Smart Phones</h1>
          <br />
          <img
            src="https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_SX444_SY639_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Mensfashion")}
        >
          <h1 className="text-2xl font-bold text-center">Fashion Mens</h1>
          <br />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4 m-auto items-center text-center">
            <img
              src="https://m.media-amazon.com/images/I/611lRrRNz2L._AC_SR525,789_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81oTmSS7J3L._AC_SR525,789_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/710o0VupScL._AC_SR525,789_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/91T-t4uFpKL._AC_SR525,789_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
          </div>
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/WomenFashion")}
        >
          <h1 className="text-2xl font-bold text-center">Fashion Women</h1>
          <br />
          <img
            src="https://m.media-amazon.com/images/I/814Mo+rn72L._AC_SR525,789_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/FashionBoys")}
        >
          <h1 className="text-2xl font-bold text-center">Fashion Boys</h1>
          <br />
          <img
            src="https://m.media-amazon.com/images/I/61Y+CiGtrGL._AC_SR525,789_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/FashionGirls")}
        >
          <h1 className="text-2xl font-bold text-center">Fashion Girls</h1>
          <br />
          <img
            src="https://m.media-amazon.com/images/I/914Fx91EOTL._AC_SR525,789_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Fashionbaby")}
        >
          <h1 className="text-2xl font-bold text-center">Fashion Baby</h1>
          <img
            src="https://m.media-amazon.com/images/I/715N3fWv2LL._AC_SR525,789_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Electronics")}
        >
          <h1 className="text-2xl font-bold text-center">Electronics</h1>
          <br />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
            <img
              src="https://m.media-amazon.com/images/I/71pXMeHxKsL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/71hLCOGRegL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81VfBSdIPvL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/61UmethhwKL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
          </div>
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Grocery")}
        >
          <h1 className="text-2xl font-bold text-center">Grocery</h1>
          <br />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
            <img
              src="https://m.media-amazon.com/images/I/815or77Y-ZL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81vn+kpb3AL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/711HXUUFGzL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/71gVQyoeguL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
          </div>
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Musicg")}
        >
          <h1 className="text-2xl font-bold text-center">Music</h1>
          <br />
          <img
            src="https://m.media-amazon.com/images/I/81PE5rGPb9L._AC_SX444_SY639_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Appliances")}
        >
          <h1 className="text-2xl font-bold text-center">Appliances</h1>
          <br />
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
            <img
              src="https://m.media-amazon.com/images/I/81RsS2LspoL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81Ol1F+XNQL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81ky0potEEL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/61k7iESCpHL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
          </div>
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Toys")}
        >
          <h1 className="text-2xl font-bold text-center">Toys And Games</h1>
          <br />
          <img
            src="https://m.media-amazon.com/images/I/71hTcFBN6HL._AC_SX444_SY639_QL65_.jpg"
            alt=""
            className="w-60 object-cover m-auto"
          />
        </div>
        <div
          className="px-2 py-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:shadow-white/80"
          onClick={() => navigate("/Prime")}
        >
          <h1 className="text-2xl font-bold text-center">Prime Exclusive</h1>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
            <img
              src="https://m.media-amazon.com/images/I/61nGM5MlMDL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81w5S+9enCL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/71TFliefYsL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
            <img
              src="https://m.media-amazon.com/images/I/81Zj2BmhdQL._AC_SX444_SY639_QL65_.jpg"
              alt=""
              className="w-24 object-cover m-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
