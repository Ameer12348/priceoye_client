import { useEffect, useRef, useState } from "react";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { IoIosStar } from "react-icons/io";
import second_logo from "../media/images/second-logo.svg";
import brand_warranty from "../media/images/brand_warranty.svg";
import pta from "../media/images/pta.svg";
import clock from "../media/images/clock.svg";
import bike from "../media/images/bike.svg";
import display from "../media/images/display.svg";
import ram from "../media/images/ram.svg";
import battery from "../media/images/battery.svg";
import backcamera from "../media/images/backcamera.svg";
import user_icon from "../media/images/user_icon.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { proxy } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import { addItem } from "../../app/cartSlice";
import { Helmet } from "react-helmet";
const MobileDetails = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRate, setUserRate] = useState(5);
  const dispatch = useDispatch();
  const auth = useSelector((x) => x.auth);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(false);
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [pending, setPending] = useState(true);
  const [rateArray] = useState([0, 1, 2, 3, 4]);
  const [rate, setRate] = useState(0);
  const [showratebox, setshowratebox] = useState(false);
  const rateinput = useRef();
  let firstRateCount = 0;
  let secondRateCount = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);


  useEffect(() => {
    const getProduct = async () => {
      try {
        setPending(true);
        const response = await fetch(`${proxy}/getproduct/${slug}`);
        const jsondata = await response.json();
        const data = jsondata;
        if (response.ok) {
          if (data.product.reviews.length > 0) {
            let average = 0;
            data.product.reviews.map((review) => (average += review.rate));
            setRate(
              Math.round((average / data.product.reviews.length) * 10) / 10,
            );
          }
          setPending(false);
          setProduct(data.product);
          setReviews(data.product.reviews);
        }
        if (!response.ok) {
          setPending(false);
          setErrors(true);
        }
      } catch (error) {
        setPending(false);
        setErrors(true);
        console.log(error);
      }
    };
    getProduct();
    const getuser = async (req, res) => {
      try {
        const response = await fetch(`${proxy}/auth/v1/getuser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth.token}`,
          },
        });
        const jsondata = await response.json();
        const data = jsondata;
        if (response.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth.token) {
      getuser();
    }
  }, [auth.token, slug, type]);
  return (
    <>
      {product !== null ? (
        <div className="bg-[#f1f3f6] dark:bg-main-darker ">
          <Helmet>
            <title>{product.title} </title>
            <meta name="description" content={product.description}></meta>
          </Helmet>
          {/* heading   */}
          <div className="mb-5 bg-white dark:bg-blue-200">
            <div className="mx-auto px-5  py-4 2xl:container">
              <p className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-600">
                {type}
                <span className="text-[10px]">
                  <LiaGreaterThanSolid />
                </span>{" "}
                {product.brand}
                <span className="text-[10px]">
                  <LiaGreaterThanSolid />
                </span>{" "}
                {product.title}
              </p>
              <h1 className="font-semibold dark:text-blue-900">
                Buy {product.title} in Pakistan
              </h1>
            </div>
          </div>
          {/* container */}
          <div className="mx-auto bg-white 2xl:container dark:bg-main-dark md:px-20">
            {/* main images and price section  */}
            <div className=" flex w-full flex-col items-start gap-10 py-4 max-md:px-4  max-sm:px-4 lg:flex-row lg:gap-2">
              {/* images section  */}
              <div className="w-[96%] overflow-hidden rounded-3xl border border-blue-300 p-4 dark:border-blue-400 sm:max-lg:w-3/4 lg:w-[40%] ">
                <img
                  src={`${proxy}/${product.thumbnail}`}
                  className="text aspect-square w-full rounded-3xl object-contain "
                />
              </div>
              {/* text section  */}
              <div className="w-[90%] pt-4 sm:w-[80%] md:px-10 lg:w-[40%]">
                <h2 className=" text-lg font-medium dark:text-gray-200">
                  {product.title}
                </h2>
                {/* rating section with stars */}
                <div className="flex items-center gap-1 py-4 ">
                  <span className="me-1 text-sm font-medium text-gray-700 dark:text-gray-300 ">
                    {rate}{" "}
                  </span>
                  {rateArray.map((rates) => {
                    if (firstRateCount < rate) {
                      firstRateCount++;
                      return (
                        <span
                          key={rates}
                          className="text-yellow-500 dark:text-yellow-600"
                        >
                          <IoIosStar />
                        </span>
                      );
                    } else {
                      return (
                        <span
                          key={rates}
                          className=" text-gray-400 dark:text-blue-200"
                        >
                          <IoIosStar />
                        </span>
                      );
                    }
                  })}
                  <span className="ms-1 text-sm font-medium text-gray-700 dark:text-gray-300 ">
                    ({reviews.length}){" "}
                  </span>
                </div>
                {/* priceoye assured  */}
                <div className="flex items-center gap-2">
                  <img
                    src="https://static.priceoye.pk/images/product-detail/po-approved.svg"
                    alt=""
                  />
                  <p className="text-sm dark:text-gray-300">PriceOye Assured</p>
                </div>
                {/* price oye pricing and stock Availability  */}
                <div className="flex justify-between py-4">
                  {/* priceoye pricing  */}
                  <div className="flex flex-col gap-1">
                    <p className=" text-sm text-gray-500 dark:text-gray-200">
                      Priceoye Price
                    </p>
                    <div className="text-3xl font-medium text-gray-700 dark:text-gray-400">
                      <sup className="me-2">Rs</sup>
                      {product.newPrice}
                    </div>
                    {product.lastPrice ? (
                      <div className="flex gap-3">
                        <p className="dark:text-white">
                          {" "}
                          <sup>
                            {" "}
                            <s>Rs</s>{" "}
                          </sup>
                          <s>{product.lastPrice} </s>{" "}
                        </p>
                        <div className="rounded bg-blue-100 p-1 text-[9px] dark:bg-blue-500 dark:text-lime-200 md:text-[12px]">
                          {Math.round(
                            100 * (1 - product.newPrice / product.lastPrice),
                          )}
                          % OFF{" "}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* priceoye stock Availability  */}
                  <div className="flex flex-col gap-1">
                    <p className=" text-sm text-gray-500 dark:text-gray-200">
                      Availability {product.stock}
                    </p>
                    <div className="text-3xl font-medium text-gray-700 dark:text-gray-400">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                </div>
                {/* storage options */}
                <div className="py-2">
                  <div>
                    <p className="  mb-2 font-medium text-gray-800 dark:text-gray-300">
                      Storage
                    </p>
                    <div className="inline-block rounded-lg border border-blue-800 p-2 dark:border-blue-300 dark:text-gray-200 ">
                      {product.productDetails.storage} -{" "}
                      {product.productDetails.ram}
                    </div>
                  </div>
                </div>
                {/* priceoye guranteed  */}
                <div className="mt-3 flex items-center gap-3 rounded-lg bg-gray-200 px-3 py-4">
                  <img src={second_logo} className="w-7 " alt="" />
                  <div>
                    <div className="mb-0.5 text-sm font-medium">
                      Priceoye Guarantee
                    </div>
                    <div className="text-[12px]">
                      Get the item you order or get your money back
                    </div>
                  </div>
                </div>
                {/* priceoye cart features */}
                <div className=" py-4">
                  {product.stock ? (
                    <button
                      className="rounded-lg bg-orange-500 px-14 py-2 text-white dark:bg-orange-700"
                      onClick={() => {
                        dispatch(addItem(product));
                      }}
                    >
                      {" "}
                      Add to Cart
                    </button>
                  ) : (
                    <button className="rounded-lg bg-gray-500 px-14 py-2 text-white dark:bg-gray-700">
                      {" "}
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* price oye quality  section start  */}
          <div className="my-5 bg-white dark:bg-main-dark">
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
          {/* priceoye quality section end  */}

          {/* price oye product features images start */}
          <div className="mt-5 bg-white dark:bg-main-dark">
            <div className="mx-auto grid grid-cols-1 2xl:container sm:grid-cols-2 lg:grid-cols-4 ">
              <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
                {/* img div  */}
                <div>
                  <img
                    className="aspect-square w-[70px] object-contain"
                    src={display}
                    alt="display"
                  />
                </div>
                {/* text section  */}
                <div>
                  <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                    {product.productDetails.screenSize}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                    Display
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
                {/* img div  */}
                <div>
                  <img
                    className="aspect-square w-[70px] object-contain"
                    src={ram}
                    alt="ram"
                  />
                </div>
                {/* text section  */}
                <div>
                  <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                    {product.productDetails.ram}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                    RAM
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
                {/* img div  */}
                <div>
                  <img
                    className="aspect-square w-[70px] object-contain"
                    src={battery}
                    alt="battery"
                  />
                </div>
                {/* text section  */}
                <div>
                  <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                    {product.productDetails.battery}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                    Battery
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 p-6 lg:flex-col">
                {/* img div  */}
                <div>
                  <img
                    className="aspect-square w-[70px] object-contain"
                    src={backcamera}
                    alt="bike rider"
                  />
                </div>
                {/* text section  */}
                <div>
                  <h2 className=" text-sm font-medium dark:text-gray-200 lg:text-center">
                    {product.productDetails.backCamera}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-200 lg:text-center">
                    Back Camera
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* mobile specs start  */}
          <div>
            <div className="mx-auto grid grid-cols-1 px-4 py-5 2xl:container  sm:px-10 md:grid-cols-12">
              <div className="flex flex-col gap-5 max-md:pb-5 sm:px-3 md:col-span-5">
                {/* mobile screen features start  */}
                <table className="w-full rounded-xl bg-white px-3 dark:bg-main-dark ">
                  <thead className="">
                    <tr>
                      <th
                        className="px-4 pb-3 pt-5 text-start text-sm font-medium text-gray-600 dark:text-gray-200 "
                        colSpan={2}
                      >
                        General Features
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Screen Size
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.screenSize}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Screen Resolution
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {" "}
                        {product.productDetails.resolution}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Screen Type
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.screenType}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-4/12 px-4 pb-4 pt-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Screen Protection
                      </th>
                      <td className=" px-4 pb-4 pt-1  text-start text-[12px] dark:text-gray-100">
                        {product.productDetails.protection}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* mobile screen features end  */}
                {/* mobile memory features start  */}
                <table className="w-full rounded-xl bg-white px-3 dark:bg-main-dark ">
                  <thead className="">
                    <tr>
                      <th
                        className="px-4 pb-3 pt-5 text-start text-sm font-medium text-gray-600 dark:text-gray-200 "
                        colSpan={2}
                      >
                        Memory
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Internal Memory
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.storage}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-4/12 px-4 pb-4 pt-1  text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        RAM
                      </th>
                      <td className=" px-4 pb-4 pt-1   text-start text-[12px]  dark:text-gray-100">
                        {" "}
                        {product.productDetails.ram}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* mobile memory features end  */}

                {/* mobile processor features start  */}
                <table className="w-full rounded-xl bg-white px-3 dark:bg-main-dark ">
                  <thead className="">
                    <tr>
                      <th
                        className="px-4 pb-3 pt-5 text-start text-sm font-medium text-gray-600 dark:text-gray-200 "
                        colSpan={2}
                      >
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Processor
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.processor}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-4/12 px-4 pb-4 pt-1  text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        GPU
                      </th>
                      <td className=" px-4 pb-4 pt-1   text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.gpu}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* mobile processor features end  */}
              </div>
              <div className="flex flex-col gap-5 sm:px-3 md:col-span-5">
                {/* mobile battery start  */}
                <table className="w-full rounded-xl bg-white px-3 dark:bg-main-dark ">
                  <thead className="">
                    <tr>
                      <th
                        className="w-4/12 px-4 pb-3 pt-5 text-start text-sm font-medium text-gray-600 dark:text-gray-200 "
                        colSpan={2}
                      >
                        Battery
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="w-4/12 px-4 pb-4 pt-1  text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Capacity
                      </th>
                      <td className=" px-4 pb-4 pt-1   text-start text-[12px]  dark:text-gray-100">
                        {" "}
                        {product.productDetails.battery}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* mobile battery end  */}
                {/* mobile camera start  */}
                <table className="w-full rounded-xl bg-white px-3 dark:bg-main-dark ">
                  <thead className="">
                    <tr>
                      <th
                        className="px-4 pb-3 pt-5 text-start text-sm font-medium text-gray-600 dark:text-gray-200 "
                        colSpan={2}
                      >
                        Camera
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Front Camera
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.frontCamera}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-4/12 px-4 pb-4 pt-1  text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Back Camera
                      </th>
                      <td className=" px-4 pb-4 pt-1   text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.backCamera}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* mobile camera end  */}
                {/* mobile connectivity start  */}
                <table className="w-full rounded-xl bg-white px-3 dark:bg-main-dark ">
                  <thead className="">
                    <tr>
                      <th
                        className="px-4 pb-3 pt-5 text-start text-sm font-medium text-gray-600 dark:text-gray-200 "
                        colSpan={2}
                      >
                        Connectivity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="w-4/12 px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Connectivity
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.connectivity}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-400">
                      <th className="px-4 py-1 text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Radio
                      </th>
                      <td className=" px-4 py-1  text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.radio}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-4 pb-4 pt-1  text-start text-[12px] font-medium text-gray-600 dark:text-gray-200 ">
                        Wifi
                      </th>
                      <td className=" px-4 pb-4 pt-1   text-start text-[12px]  dark:text-gray-100">
                        {product.productDetails.wifi}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* mobile  connectivity end  */}
              </div>
            </div>
          </div>
          {/* mobile specs end  */}
          {/* rate box */}
          <div
            className={`fixed left-0 top-0 z-[100000000] flex h-screen  items-center justify-center overflow-hidden bg-[#0000002f] duration-0 ${showratebox ? "w-screen" : "w-0"}`}
            onClick={() => {
              setshowratebox(false);
            }}
          >
            {auth.token ? (
              <div
                className="relative min-w-[400px] bg-white p-5 duration-0 dark:bg-main-darker"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-xl dark:text-white">Rate Product</h1>
                <div className="flex w-full pb-3 pt-5">
                  <button
                    className="flex-grow bg-red-400 text-white dark:bg-red-600"
                    onClick={() => {
                      if (userRate > 1) {
                        setUserRate(userRate - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button className="flex-grow dark:text-white">
                    {userRate}{" "}
                  </button>
                  <button
                    className="flex-grow bg-green-400 p-2 text-white dark:bg-green-600"
                    onClick={() => {
                      if (userRate < 5) {
                        setUserRate(userRate + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
                <textarea
                  className="w-full border border-blue-200 px-3 py-2 outline-0 "
                  type="text"
                  placeholder="Comment"
                  ref={rateinput}
                ></textarea>
                <div>
                  <button
                    className="mt-3 w-full bg-green-400 p-2 text-white dark:bg-green-700"
                    onClick={async () => {
                      try {
                        if (rateinput.current.value.length === 0) {
                          return toast.error(
                            "Please write a comment to rate a product",
                            {
                              position: "top-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                              transition: Flip,
                            },
                          );
                        }
                        const response = await fetch(
                          `${proxy}/rateproduct/${product._id}`,
                          {
                            method: "POST",
                            body: JSON.stringify({
                              rate: userRate,
                              comment: rateinput.current.value,
                            }),
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: auth.token,
                            },
                          },
                        );
                        console.log(response);
                        const jsondata = await response.json();
                        const data = jsondata;
                        console.log(data);
                        if (response.status === 201) {
                          toast.success(data.message, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                            transition: Flip,
                          });
                          setReviews([data.review, ...reviews]);
                          setshowratebox(false);
                        } else {
                          setshowratebox(false);
                          toast.error(data.error, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Flip,
                          });
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    {" "}
                    Rate
                  </button>
                  <button
                    className="mt-3 w-full bg-red-400 p-2 text-white dark:bg-red-700 "
                    onClick={() => {
                      setshowratebox(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded bg-white p-10">
                <p className="text-center text-lg text-main-darker">
                  Please Login to rate a product
                </p>

                <div className="mt-5 bg-main-darker  text-center text-main-lighter">
                  <button
                    className="inline-block w-full p-3"
                    to={"/login"}
                    onClick={() => {
                      navigate("/login", {
                        state: location.pathname,
                      });
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white dark:bg-main-dark">
            <div className="mx-auto flex items-center justify-between gap-2 px-4 py-10 2xl:container sm:px-10">
              <div>
                <h4 className="text-2xl font-medium text-gray-700 dark:text-gray-300">
                  Reviews
                </h4>
              </div>
              <div>
                <div
                  className="flex cursor-pointer items-center gap-1 py-4 "
                  onClick={() => {
                    setshowratebox(true);
                  }}
                >
                  <span className="me-1 text-sm font-medium text-gray-700 dark:text-gray-300 ">
                    {rate}{" "}
                  </span>
                  {rateArray.map((rates) => {
                    if (secondRateCount < rate) {
                      secondRateCount++;
                      return (
                        <span
                          key={rates}
                          className="text-yellow-500 dark:text-yellow-600"
                        >
                          <IoIosStar />
                        </span>
                      );
                    } else {
                      return (
                        <span
                          key={rates}
                          className=" text-gray-400 dark:text-blue-200"
                        >
                          <IoIosStar />
                        </span>
                      );
                    }
                  })}
                  <span className="ms-1 text-sm font-medium text-gray-700 dark:text-gray-300 ">
                    ({reviews.length}){" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* review cards  */}

          {reviews.map((review) => {
            let reviewrate = Math.round(review.rate);
            let ratecounter = 0;
            return (
              <div key={review._id}>
                {review.allowed ? (
                  <div className="mt-5 bg-white py-10 dark:bg-main-dark">
                    <div className="mx-auto  px-5 2xl:container sm:px-10 md:px-20">
                      <div className="flex items-center justify-between  pb-5">
                        {/* image and name section  */}
                        <div className="flex items-center gap-2">
                          <div>
                            <img
                              src={user_icon}
                              className=" aspect-square w-[50px] rounded-[50%] bg-gray-200 dark:bg-gray-300"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h5 className="text-sm font-medium dark:text-gray-200">
                              {user !== null
                                ? user._id === review.user._id
                                  ? "You"
                                  : review.user.name
                                : review.user.name}
                            </h5>
                            <div className="flex items-center gap-1 ">
                              {rateArray.map((rates) => {
                                if (ratecounter < reviewrate) {
                                  ratecounter++;
                                  return (
                                    <span
                                      key={rates}
                                      className="text-yellow-500 dark:text-yellow-600"
                                    >
                                      <IoIosStar />
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span
                                      key={rates}
                                      className=" text-gray-400 dark:text-blue-200"
                                    >
                                      <IoIosStar />
                                    </span>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                        {/* created at section  */}
                        <div>
                          <h6 className="text-gray-800 dark:text-gray-200">
                            {new Date(review.createdAt).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                              },
                            )}
                          </h6>
                        </div>
                      </div>
                      <div className="text-[12px] text-gray-800 dark:text-gray-300">
                        {review.comment}
                      </div>
                      {user !== null ? (
                        user.role === "ADMIN" ? (
                          <div className="flex gap-4 pt-3">
                            <button
                              className="text-sm text-red-700 dark:text-red-400"
                              onClick={async () => {
                                try {
                                  const response = await fetch(
                                    `${proxy}/deletereview/${review.pid}/${review._id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        Authorization: `${auth.token}`,
                                        "Content-Type": "application/json",
                                      },
                                    },
                                  );
                                  const jsondata = await response.json();
                                  const data = jsondata;
                                  if (response.ok) {
                                    toast.success(data.message, {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: false,
                                      progress: undefined,
                                      theme: "light",
                                      transition: Flip,
                                    });
                                    const filterreviews = reviews.filter(
                                      (review1) => review1._id !== review._id,
                                    );
                                    setTimeout(() => {
                                      setReviews(filterreviews);
                                    }, 500);
                                  }
                                  if (!response.ok) {
                                    toast.error(data.error, {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                      transition: Flip,
                                    });
                                    console.log(data);
                                  }
                                } catch (error) {
                                  console.log(error);
                                  toast.error("an error occured", {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Flip,
                                  });
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {user !== null && !review.allowed ? (
                  review.user._id === user._id || user.role === "ADMIN" ? (
                    <>
                      <div className="mt-5 bg-white py-10 dark:bg-main-dark">
                        <div className="mx-auto  px-5 2xl:container sm:px-10 md:px-20">
                          <div className="flex items-center justify-between  pb-5">
                            {/* image and name section  */}
                            <div className="flex items-center gap-2">
                              <div>
                                <img
                                  src={user_icon}
                                  className=" aspect-square w-[50px] rounded-[50%] bg-gray-200 dark:bg-gray-300"
                                  alt=""
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <h5 className="text-sm font-medium dark:text-gray-200">
                                  {user._id === review.user._id
                                    ? "You"
                                    : review.user.name}
                                </h5>
                                <div className="flex items-center gap-1 ">
                                  {rateArray.map((rates) => {
                                    if (ratecounter < reviewrate) {
                                      ratecounter++;
                                      return (
                                        <span
                                          key={rates}
                                          className="text-yellow-500 dark:text-yellow-600"
                                        >
                                          <IoIosStar />
                                        </span>
                                      );
                                    } else {
                                      return (
                                        <span
                                          key={rates}
                                          className=" text-gray-400 dark:text-blue-200"
                                        >
                                          <IoIosStar />
                                        </span>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                            {/* created at section  */}
                            <div>
                              <h6 className="text-gray-800 dark:text-gray-200">
                                {new Date(review.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit",
                                  },
                                )}
                              </h6>
                            </div>
                          </div>
                          <div className="text-[12px] text-gray-800 dark:text-gray-300">
                            {review.comment}
                          </div>
                          <div className="flex gap-4 pt-3">
                            <button
                              className="text-sm text-red-700 dark:text-red-400"
                              onClick={async () => {
                                try {
                                  const response = await fetch(
                                    `${proxy}/deletereview/${review.pid}/${review._id}`,
                                    {
                                      method: "DELETE",
                                      headers: {
                                        Authorization: `${auth.token}`,
                                        "Content-Type": "application/json",
                                      },
                                    },
                                  );
                                  const jsondata = await response.json();
                                  const data = jsondata;
                                  if (response.ok) {
                                    toast.success(data.message, {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: false,
                                      progress: undefined,
                                      theme: "light",
                                      transition: Flip,
                                    });
                                    const filterreviews = reviews.filter(
                                      (review1) => review1._id !== review._id,
                                    );
                                    setTimeout(() => {
                                      setReviews(filterreviews);
                                    }, 500);
                                  }
                                  if (!response.ok) {
                                    toast.error(data.error, {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                      transition: Flip,
                                    });
                                  }
                                } catch (error) {
                                  console.log(error);
                                  toast.error("an error occured", {
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Flip,
                                  });
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          <div className="py-2"></div>
        </div>
      ) : (
        <>
          <div className="min-h-[70vh] bg-[#f1f3f6] dark:bg-main-darker">
            {pending ? (
              <div className="fixed left-0 top-0 z-[30000000]  flex h-screen w-screen items-center justify-center bg-[#00000042] ">
                <div className="h-10 w-10 animate-spin rounded-[50%] border-[5px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
              </div>
            ) : (
              <></>
            )}
            {errors ? (
              <h1 className="py-10  text-center text-2xl font-medium text-gray-800 dark:text-gray-200">
                Product Not Found
              </h1>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MobileDetails;
