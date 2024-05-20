import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { proxy } from "../../constants";
import ProductCard from "../Product/ProductCard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

export const EarbudSlide = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`${proxy}/products/earbuds`);
        const jsondata = await response.json();
        const data = jsondata;
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="mx-auto mt-2 px-2 py-10 2xl:container">
      <div className=" flex justify-between  px-3 py-10 ">
        <h2 className="text-lg font-medium dark:text-white">
          Latest Wireless Earbuds
        </h2>
        <a
          className="cursor-pointer text-lg text-blue-400"
          onClick={() => {
            navigate("/earbuds");
          }}
        >
          View All
        </a>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        slidesPerView={2}
        spaceBetween={5}
        freeMode={{
          enabled: true,
        }}
        breakpoints={{
          550: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {products.map((product) => {
          return (
            <SwiperSlide key={product._id}>
              <ProductCard
                key={product._id}
                title={product.title}
                slug={product.type + "/" + product.slug}
                lastPrice={product.lastPrice}
                newPrice={product.newPrice}
                thumbnail={`${proxy}/${product.thumbnail}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
