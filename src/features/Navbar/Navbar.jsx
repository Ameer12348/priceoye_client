import { useEffect, useRef, useState } from "react";
import logo from "../media/images/logo.svg";
import logo_white from "../media/images/logo_white.svg";
import { Link, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineContactPhone } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";
import { LuMonitor } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import "./Navbar.css";
import { categories } from "../../constants/navbar";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../app/authSlice";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
const Navbar = () => {
  const searchInput = useRef();
  const auth = useSelector((x) => x.auth);
  const [sidenavShow, setSideNavShow] = useState(false);
  const themediv = useRef();
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  return (
    <>
      <div className=" z-50 flex w-full items-center justify-between overflow-y-visible bg-main-light py-3 dark:bg-main-dark">
        <div className="flex flex-shrink-0 items-center gap-2.5 px-2.5">
          <div>
            <button
              className=" p-1 "
              onClick={() => {
                if (!sidenavShow) {
                  setSideNavShow(true);
                } else {
                  sidenavShow(false);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-white dark:text-main-light"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* hamburger section and side nav end  */}
          <div>
            <Link to={"/"}>
              <img
                src={logo}
                className=" w-[130px]  dark:[filter:brightness(0.7)] max-[800px]:w-[100px] max-[500px]:hidden"
                alt="priceoye logo"
              />
              <img
                src={logo_white}
                className=" hidden w-[30px]  dark:[filter:brightness(0.7)]   max-[500px]:inline-block "
                alt="priceoye logo"
              />
            </Link>
          </div>
          {/* logo section end */}
        </div>
        {/* logo,sidenav and hamburger end */}
        <div className="w-[400px] flex-shrink max-sm:me-2">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchInput.current.value.length > 0) {
                navigate(`/searchproduct/${searchInput.current.value}`);
              }
            }}
          >
            <input
              className="w-full rounded-md p-3 text-gray-500 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark max-sm:py-2"
              type="text"
              placeholder="Search..."
              ref={searchInput}
            />
          </form>
        </div>
        {/* search section end */}
        <div className="flex items-center">
          <div>
            <button className="group/theme relative mx-2 rounded bg-white px-2 py-2 text-lg text-main-light dark:bg-main-light dark:text-main-dark">
              {theme === "light" ? <GoSun /> : <BsMoonStars />}
              <div
                className={`absolute right-0 top-[150%]  z-[10000] flex max-h-0  flex-col overflow-hidden rounded-lg bg-main-light group-focus/theme:max-h-[1000px] dark:bg-main-dark  `}
                ref={themediv}
              >
                <div
                  className="m-1 flex   items-center justify-start border-b px-3 py-0.5 text-left text-white dark:text-main-lighter"
                  onClick={() => {
                    localStorage.setItem("theme", "light");
                    document.documentElement.classList.remove("dark");
                    setTheme("light");
                  }}
                >
                  <span className="me-1 text-lg">
                    <GoSun />
                  </span>{" "}
                  Light
                </div>
                <div
                  className="m-1 flex   items-center justify-start border-b px-3 py-0.5 text-left text-white dark:text-main-lighter"
                  onClick={() => {
                    localStorage.setItem("theme", "dark");
                    document.documentElement.classList.add("dark");
                    setTheme("dark");
                  }}
                >
                  <span className="me-1 text-lg">
                    <BsMoonStars />
                  </span>{" "}
                  Dark
                </div>
                <div
                  className="m-1   flex items-center justify-start px-3 py-0.5 text-left text-white dark:text-main-lighter"
                  onClick={() => {
                    localStorage.removeItem("theme");
                    if (
                      window.matchMedia("(prefers-color-scheme: dark)").matches
                    ) {
                      document.documentElement.classList.add("dark");
                      setTheme("dark");
                    } else {
                      document.documentElement.classList.remove("dark");
                      setTheme("light");
                    }
                  }}
                >
                  <span className="me-1 text-lg">
                    <LuMonitor />{" "}
                  </span>{" "}
                  System
                </div>
              </div>
            </button>

            {/* theme toggle div and button end end  */}
          </div>
          {auth.user ? (
            <div className=" relative mx-3 rounded-md bg-white px-6 py-2 text-main-light dark:bg-main-light dark:text-main-dark max-sm:hidden">
              <button className="group">
                {auth.user.name.split(" ")[0]}
                <div
                  className={`absolute right-0 top-[150%] z-[10000] flex max-h-0 w-[200px]  flex-col overflow-hidden rounded-lg bg-main-light group-focus:max-h-[1000px] dark:bg-main-dark  `}
                >
                  <div
                    className="m-1 flex   items-center justify-start border-b px-3 py-0.5 text-left text-white dark:text-main-lighter"
                    onClick={() => {
                      navigate("/user/profile");
                    }}
                  >
                    <span>Profile</span>
                  </div>
                  {auth.user.role === "ADMIN" ? (
                    <div
                      className="m-1 flex   items-center justify-start border-b px-3 py-0.5 text-left text-white dark:text-main-lighter"
                      onClick={() => {
                        navigate("/admin/products");
                      }}
                    >
                      <span>Admin Panel</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className="m-1 flex   items-center justify-start border-b px-3 py-0.5 text-left text-white dark:text-main-lighter"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    <div>Cart</div>
                  </div>
                  <div
                    className="m-1   flex items-center justify-start  px-3 py-0.5 text-left text-red-800 dark:text-red-400"
                    onClick={() => {
                      dispatch(setAuth({ user: null, token: "" }));
                      localStorage.removeItem("auth");
                      navigate("/");
                    }}
                  >
                    <span>Logout</span>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="mx-3 rounded-md bg-white px-6 py-2 text-main-light dark:bg-main-light dark:text-main-dark max-sm:hidden">
              <Link to={"/login"}> Login </Link>
            </div>
          )}
        </div>
        {/* side nav parent */}
        <div
          className={`fixed left-0 top-0 z-50 h-full ${sidenavShow ? "w-screen" : "w-0"} bg-[rgba(0,0,0,0.3)]  duration-0 `}
          onClick={() => {
            if (sidenavShow) {
              setSideNavShow(false);
            }
          }}
        >
          {/* side nav start  */}
          <div
            className={`side-nav   fixed  top-0   z-50 h-full w-[350px]  overflow-x-hidden  overflow-y-scroll bg-white   duration-500 dark:bg-main-darker ${sidenavShow ? "left-0" : "-left-full"} max-[400px]:w-full`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative flex w-full flex-col items-start gap-4 bg-main-light px-8  pb-10 pt-20 dark:bg-main-dark">
              <div>
                <Link to={"/"}>
                  <img
                    src={logo}
                    className="w-[130px] dark:[filter:brightness(0.7)]"
                    alt="priceoye logo"
                  />
                </Link>
              </div>
              {/* side logo end  */}
              <div>
                {auth.token ? (
                  <>
                    <div className=" relative  rounded-md bg-white px-6 py-2 text-center text-main-light dark:bg-main-light dark:text-main-dark max-sm:hidden">
                      <button className="text-center">
                        {auth.user.name.split(" ")[0]}
                      </button>
                    </div>
                    <div
                      className={`z-[10000] overflow-hidden  rounded-lg bg-main-light pt-2 group-focus:max-h-[1000px] dark:bg-main-dark  `}
                    >
                      <div
                        className="m-1 flex cursor-pointer   items-center justify-start gap-2   py-0.5 text-left text-white dark:text-main-lighter"
                        onClick={() => {
                          navigate("/user/profile");
                        }}
                      >
                        <span>
                          <CgProfile />
                        </span>
                        <span>Profile</span>
                      </div>
                      {auth.user.role === "ADMIN" ? (
                        <div
                          className="m-1 flex  cursor-pointer items-center justify-start gap-2  py-0.5 text-left text-white dark:text-main-lighter"
                          onClick={() => {
                            navigate("/admin/products");
                          }}
                        >
                          <span>
                            <MdOutlineDashboard />
                          </span>
                          <span>Admin Panel</span>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div
                        className="m-1 flex cursor-pointer items-center justify-start gap-2   py-0.5 text-left font-medium text-red-100 "
                        onClick={() => {
                          dispatch(setAuth({ user: null, token: "" }));
                          localStorage.removeItem("auth");
                          navigate("/");
                        }}
                      >
                        <span>
                          <BiLogOut />{" "}
                        </span>
                        <span>Logout</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="  rounded-md bg-white px-6 py-2 text-main-light dark:bg-main-light dark:text-main-dark">
                    <Link to={"/login"}>Login </Link>
                  </div>
                )}
              </div>
              <div>
                <Link
                  className="flex items-center gap-1 text-nowrap text-white dark:text-main-lighter"
                  to={"/cart"}
                >
                  <IoCartOutline /> Cart
                </Link>
              </div>
              <div>
                <Link className="flex items-center gap-1 text-nowrap text-white dark:text-main-lighter">
                  <CiLocationOn />
                  Track My Order
                </Link>
              </div>
              <div>
                <Link className="flex items-center gap-1 text-white dark:text-main-lighter ">
                  <MdOutlineContactPhone /> Submit a Complaint
                </Link>
              </div>
              <button
                className="absolute right-10 top-10 text-white dark:text-main-lighter"
                onClick={() => {
                  if (sidenavShow) {
                    setSideNavShow(false);
                  }
                }}
              >
                Close
              </button>
            </div>
            {/* side nav first inner sectin end of logo and login  */}
            <div className="ps-8 pt-3 ">
              <h6 className=" text-left text-sm font-semibold text-gray-500 [text-transform:uppercase] dark:text-main-lighter ">
                Categories
              </h6>
              <div className="py-2 pe-8">
                {categories.map((cat) => {
                  return (
                    <div key={cat.name}>
                      <button className="group/sublink my-1 block w-full cursor-pointer rounded-lg border border-blue-50 px-2 py-1 text-left duration-100 focus:cursor-default focus:bg-[#e6eef594] dark:border-blue-500  dark:bg-main-dark dark:text-main-lighter ">
                        <div className="flex items-center justify-between">
                          <Link className="p-2" to={cat.slug}>
                            {cat.name}
                          </Link>
                          <div className="me-2 group-focus/sublink:rotate-180">
                            <FaAngleDown />
                          </div>
                        </div>
                        <div className="group-focus/sublink:border-t-main max-h-0 overflow-hidden ps-2 duration-300 group-focus/sublink:max-h-[1000px] group-focus/sublink:border-t">
                          {cat.subcategories.map((sub) => {
                            return (
                              <div className="my-2 p-0.5 px-2" key={sub.name}>
                                <Link
                                  className="block"
                                  to={cat.slug + "?brand=" + sub.slug}
                                >
                                  {sub.name}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* category div end  */}
            </div>
            {/* categories section end  */}
          </div>
        </div>
        {/* side nav end  */}
      </div>
    </>
  );
};

export default Navbar;
