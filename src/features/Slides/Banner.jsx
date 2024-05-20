// Import Swiper React components
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner_1 from "../media/banners/banner_1.jpg";
import banner_2 from "../media/banners/banner_2.jpg";
import banner_3 from "../media/banners/banner_3.jpg";
import banner_4 from "../media/banners/banner_4.jpg";
import banner_5 from "../media/banners/banner_5.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Banner = () => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      slidesPerView={1}
    >
      <SwiperSlide>
        <div className="aspect-[510/191] bg-blue-400">
          <img className="h-full w-full " src={banner_1} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="aspect-[510/191] bg-blue-400">
          <img className="h-full w-full " src={banner_2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="aspect-[510/191] bg-blue-400">
          <img className="h-full w-full " src={banner_3} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="aspect-[510/191] bg-blue-400">
          <img className="h-full w-full " src={banner_4} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="aspect-[510/191] bg-blue-400">
          <img className="h-full w-full " src={banner_5} alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
