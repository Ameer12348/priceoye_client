import Banner from "../features/Slides/Banner";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { EarbudSlide } from "../features/Slides/EarbudSlide";
import brand_warranty from "../features/media/images/brand_warranty.svg";
import pta from "../features/media/images/pta.svg";
import clock from "../features/media/images/clock.svg";
import bike from "../features/media/images/bike.svg";
import ramadan from "../features/media/images/ramadan.jpg";
import { MobileSlide } from "../features/Slides/MobileSlide";
import ShopByPrice from "../features/Product/ShopByPrice";
import ReasonBuy from "../features/Product/ReasonBuy";
import { TabletSlide } from "../features/Slides/TabletSlide";
import { WatchSlide } from "../features/Slides/WatchSlide";
const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="min-h-[70vh] bg-[#f1f3f6] pb-5 dark:bg-main-darker">
      <Helmet>
        <title>Priceoye.pk </title>
      </Helmet>
      <Banner />
      <EarbudSlide />
      <ShopByPrice />
      <MobileSlide />
      <ReasonBuy />
      <WatchSlide />
      <div className=" py-4">
        <img className="h-full w-full" src={ramadan} alt="" />
      </div>
      <TabletSlide />
      <div className="mt-5 bg-white dark:bg-main-dark">
        <div className="mx-auto grid grid-cols-1 2xl:container sm:grid-cols-2 lg:grid-cols-4 ">
          <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
            {/* img div  */}
            <div>
              <img
                className="aspect-square w-[70px] object-contain"
                src={brand_warranty}
                alt="brand warranty"
              />
            </div>
            {/* text section  */}
            <div>
              <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                1 Year Warranty
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                Brand Warranty
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
            {/* img div  */}
            <div>
              <img
                className="aspect-square w-[70px] object-contain"
                src={pta}
                alt="pta approved"
              />
            </div>
            {/* text section  */}
            <div>
              <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                PTA Approved
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                Mobiles
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
            {/* img div  */}
            <div>
              <img
                className="aspect-square w-[70px] object-contain"
                src={clock}
                alt="delivery on time"
              />
            </div>
            {/* text section  */}
            <div>
              <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                48hr Delivery
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                Open Parcel
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
            {/* img div  */}
            <div>
              <img
                className="aspect-square w-[70px] object-contain"
                src={bike}
                alt="bike rider"
              />
            </div>
            {/* text section  */}
            <div>
              <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                Free Delivery
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                All Over Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
