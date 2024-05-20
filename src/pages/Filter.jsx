import { useEffect, useRef, useState } from "react";
import ProductCard from "../features/Product/ProductCard";
import { FaAngleDown } from "react-icons/fa6";
import { proxy } from "../constants";
import { Helmet } from "react-helmet";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useLocation } from "react-router-dom";
const Filter = ({
  sortFilter,
  brandFilter,
  priceSorting,
  banner,
  welcomeHeading,
  welcomeParagraph,
  type,
}) => {
  const [sortToggle, setSortToggle] = useState(true);
  const [sortShow, setSortShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [priceToggle, setPriceToggle] = useState(true);
  const [brandToggle, setbrandToggle] = useState(true);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(false);
  const [brandChecked, setBrandChecked] = useState([]);
  const [pricingChecked, setPricingChecked] = useState([]);
  const [page, setPage] = useState({ value: 1 });
  const [sort, setSort] = useState({ value: "" });
  const filter_main = useRef();
  const limit = 20;
  const location = useLocation();
  let brandQuery = new URLSearchParams(location.search).get("brand");
  if (brandQuery) {
    brandQuery = brandQuery.split(",");
  }
  useEffect(() => {
    if (brandQuery) {
      brandFilter.map((sort) => {
        const find = brandQuery.find((sor) => sor === sort.filter);
        if (find) {
          const el = document.getElementById(find);
          el.checked = true;
          checkBrandHandler(true, sort.filter);
        }
      });
    }
  }, [brandQuery ? brandQuery.length : ""]);
  useEffect(() => {
    const fetchdata = async () => {
      setPending(true);
      try {
        const response = await fetch(
          `${proxy}/products/${type}?brand=${brandChecked.join(",")}&pricing=${pricingChecked.join(",")}&limit=${limit}&page=${page.value}&sort=${sort.value}`,
        );
        const jsondata = await response.json();
        const data = jsondata;
        if (response.ok) {
          window.scrollTo(0, filter_main.current.offsetTop);
          setPending(false);
          setTotal(data.total);
          setProducts(data.products);
        }
        if (!response.ok) {
          setPending(false);
        }
      } catch (error) {
        setPending(false);
        console.log(error);
      }
    };
    fetchdata();
  }, [
    type,
    brandChecked.length,
    pricingChecked.length,
    page.value,
    sort.value,
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkBrandHandler = (value, filter) => {
    let all = [...brandChecked];
    if (value) {
      all.push(filter);
    } else {
      all = all.filter((fil) => fil !== filter);
    }
    setBrandChecked(all);
    setPage({ value: 1 });
  };
  const pricingHandler = (value, filter) => {
    let all = [...pricingChecked];
    if (value) {
      all.push(filter);
    } else {
      all = all.filter((fil) => fil !== filter);
    }
    setPricingChecked(all);
    setPage({ value: 1 });
  };
  return (
    <div className="min-h-[70vh] bg-[#f1f3f6]  dark:bg-main-darker">
      <Helmet>
        <title>Buy {type} at the best rate in pakistan </title>
      </Helmet>
      {/* best product heading  */}
      <div className="p-4">
        <div className="bg-white p-4 dark:bg-main-light">
          <h1 className=" mb-2 dark:text-main-darker">{welcomeHeading}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {welcomeParagraph}
          </p>
        </div>
      </div>
      {/*  banner */}
      <div className="">
        <img className="aspect-[2600/700]" src={banner} alt="" />
      </div>
      {/* filter and sort hover for max md */}
      <div className="mt-10 grid w-full grid-cols-2 gap-4 px-10 sm:px-5 md:hidden">
        <button
          className="bg-white py-4 dark:bg-main-light dark:text-main-darker"
          onClick={() => {
            if (!sortShow) {
              setSortShow(true);
            }
          }}
        >
          Sort By
        </button>
        <button
          className="bg-white py-4 dark:bg-main-light dark:text-main-darker"
          onClick={() => {
            if (!filterShow) {
              setFilterShow(true);
            }
          }}
        >
          Filter By
        </button>
      </div>
      {/* products and filter div  */}
      <div
        ref={filter_main}
        className="mx-auto  grid grid-cols-4 gap-5 p-10 3xl:container  max-md:grid-cols-1 max-md:justify-center  max-md:pt-2 max-sm:px-2 md:max-lg:grid-cols-10"
      >
        {/* filter section  */}
        <div className="rounded bg-white p-4 max-md:mx-auto max-md:w-full max-md:p-0 md:min-h-[700px] md:dark:bg-main-dark md:max-lg:col-span-3 ">
          {/* sorting */}
          <div
            className={`left-0 top-0 z-40 duration-0 max-md:fixed max-md:h-screen max-md:bg-[rgba(0,0,0,0.4)] ${sortShow ? "max-md:w-screen" : "max-md:w-0"} `}
            onClick={() => {
              if (sortShow) {
                setSortShow(false);
              }
            }}
          >
            <div
              className={`sorting-div-mobiles z-50 ${sortShow ? "max-md:left-0" : "max-md:-left-full"}   mb-3 border-b border-main-lighter pb-4 dark:bg-main-dark max-md:fixed  max-md:h-screen max-md:w-96 max-md:overflow-y-scroll max-md:bg-white max-md:px-5 max-md:py-20 max-md:ps-5 max-[400px]:w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="mb-2 flex cursor-pointer items-center justify-between font-semibold dark:text-gray-200"
                onClick={() => {
                  if (sortToggle) {
                    setSortToggle(false);
                  } else {
                    setSortToggle(true);
                  }
                }}
              >
                <span>SORTING</span>
                <span className={`${sortToggle ? "rotate-180" : ""}`}>
                  <FaAngleDown />
                </span>
              </h3>

              <ul
                className={`${sortToggle ? "max-h-[1000px]" : "max-h-[0px]"} overflow-hidden`}
              >
                {sortFilter.map((sor) => {
                  return (
                    <li key={sor.name}>
                      <label
                        className="my-1 block flex-1 cursor-pointer py-0.5 text-sm text-gray-600 dark:text-gray-300"
                        htmlFor={"sorting_mobile" + sor.name}
                      >
                        {" "}
                        <input
                          type="radio"
                          name="sort"
                          className="me-2"
                          id={"sorting_mobile" + sor.name}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSort({ value: sor.filter });
                            } else {
                              setSort({ value: "" });
                            }
                          }}
                        />
                        {sor.name}{" "}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <button
                className="absolute right-5 top-5 text-gray-600 dark:text-gray-300 md:hidden"
                onClick={() => {
                  if (sortShow) {
                    setSortShow(false);
                  }
                }}
              >
                close
              </button>
            </div>
          </div>
          {/* outer filter section div  */}
          <div
            className={`left-0 top-0 z-40 duration-0 max-md:fixed max-md:h-screen max-md:bg-[rgba(0,0,0,0.4)] ${filterShow ? "max-md:w-screen" : "max-md:w-0"} `}
            onClick={() => {
              if (filterShow) {
                setFilterShow(false);
              }
            }}
          >
            {/* inner filter section div  */}
            <div
              className={`${filterShow ? "max-md:left-0" : "max-md:-left-96  "} sorting-div-mobiles z-50 dark:bg-main-dark max-md:fixed  max-md:h-screen max-md:w-96 max-md:overflow-y-scroll max-md:bg-white max-md:px-5 max-md:py-20 max-md:ps-5 max-[400px]:w-full`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/* price filters */}
              <div className="mb-4 border-b border-main-lighter pb-3">
                <h3
                  className="mb-2 flex cursor-pointer items-center justify-between font-semibold dark:text-gray-200"
                  onClick={() => {
                    if (priceToggle) {
                      setPriceToggle(false);
                    } else {
                      setPriceToggle(true);
                    }
                  }}
                >
                  <span>PRICE RANGE</span>
                  <span className={`${priceToggle ? "rotate-180" : ""}`}>
                    <FaAngleDown />
                  </span>
                </h3>

                <ul
                  className={`${priceToggle ? "max-h-[1000px]" : "max-h-[0px]"} overflow-hidden`}
                >
                  {priceSorting.map((sort) => {
                    return (
                      <li key={sort.name}>
                        <label
                          className="my-1 block flex-1 cursor-pointer py-0.5 text-sm text-gray-600 dark:text-gray-300"
                          htmlFor={"sorting_mobile" + sort.name}
                        >
                          {" "}
                          <input
                            type="checkbox"
                            className="me-2"
                            id={"sorting_mobile" + sort.name}
                            onChange={(e) => {
                              pricingHandler(e.target.checked, sort.filter);
                            }}
                          />
                          {sort.name}{" "}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* mobile brands filter */}
              <div className="mb-4 border-b border-main-lighter pb-3">
                <h3
                  className="mb-2 flex cursor-pointer items-center justify-between font-semibold dark:text-gray-200"
                  onClick={() => {
                    if (brandToggle) {
                      setbrandToggle(false);
                    } else {
                      setbrandToggle(true);
                    }
                  }}
                >
                  <span>BRANDS</span>
                  <span className={`${brandToggle ? "rotate-180" : ""}`}>
                    <FaAngleDown />
                  </span>
                </h3>

                <ul
                  className={`${brandToggle ? "max-h-[2000px]" : "max-h-[0px]"} overflow-hidden`}
                >
                  {brandFilter.map((sort) => {
                    return (
                      <li key={sort.name}>
                        <label
                          className="my-1 block flex-1 cursor-pointer py-0.5 text-sm text-gray-600 dark:text-gray-300"
                          htmlFor={"sorting_mobile" + sort.name}
                        >
                          {" "}
                          <input
                            type="checkbox"
                            className="me-2"
                            id={sort.filter}
                            onChange={(e) => {
                              checkBrandHandler(e.target.checked, sort.filter);
                            }}
                          />
                          {sort.name}{" "}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button
                className="absolute right-5 top-5 text-gray-600 dark:text-gray-300 md:hidden"
                onClick={() => {
                  if (filterShow) {
                    setFilterShow(false);
                  }
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
        {pending ? (
          <div className="fixed left-0 top-0 z-[30000000]  flex h-screen w-screen items-center justify-center bg-[#00000042] ">
            <div className="h-10 w-10 animate-spin rounded-[50%] border-[5px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
          </div>
        ) : (
          <></>
        )}
        {/* products section */}
        <div className="col-span-3 grid min-h-[50vh] content-start items-stretch max-md:col-span-1 max-sm:grid-cols-1 max-sm:justify-center sm:grid-cols-2 md:max-lg:col-span-7 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 ">
          {products.map((product) => {
            return (
              <ProductCard
                title={product.title}
                key={product._id}
                slug={product.type + "/" + product.slug}
                lastPrice={product.lastPrice}
                newPrice={product.newPrice}
                thumbnail={`${proxy}/${product.thumbnail}`}
              />
            );
          })}
        </div>
        {/* Pagination  */}
      </div>
      <div className="border-gray-200 bg-white  dark:bg-main-dark">
        <div className="mx-auto flex items-center justify-between border-t px-4 py-3  2xl:container dark:border-0 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            {1 < page.value ? (
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  if (1 < page.value) {
                    setPage({ value: page.value - 1 });
                  }
                }}
              >
                Previous
              </a>
            ) : (
              <div></div>
            )}

            {Math.ceil(total / limit) > page.value ? (
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  if (Math.ceil(total / limit) > page.value) {
                    setPage({ value: page.value + 1 });
                  }
                }}
              >
                Next
              </a>
            ) : (
              <></>
            )}
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-white">
                Showing{" "}
                {total > 0 ? (
                  <>
                    <span className="font-medium">
                      {(page.value - 1) * limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {page.value * limit < total ? page.value * limit : total}{" "}
                    </span>{" "}
                    of{" "}
                  </>
                ) : (
                  <></>
                )}
                <span className="font-medium">{total} </span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  className="relative inline-flex items-center rounded-l-md px-5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
                  onClick={() => {
                    if (1 < page.value) {
                      setPage({ value: page.value - 1 });
                    }
                  }}
                >
                  <span>
                    <GrFormPrevious />
                  </span>
                </button>
                {Array.from({ length: Math.ceil(total / limit) }).length > 0 ? (
                  Array.from({ length: Math.ceil(total / limit) }).map(
                    (el, index) => {
                      return (
                        <button
                          key={index}
                          aria-current="page"
                          className={`relative z-10 inline-flex items-center ${index + 1 === page.value ? "bg-indigo-600 text-white dark:bg-indigo-400 dark:text-gray-600  dark:ring-gray-300" : "ring-gray-300 hover:bg-indigo-600 hover:text-white dark:text-white"} relative inline-flex items-center px-4  py-2  text-sm   font-semibold text-gray-900 ring-1 ring-inset hover:ring-0   focus:z-20   focus:outline-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          onClick={() => {
                            setPage({ value: index + 1 });
                          }}
                        >
                          {index + 1}
                        </button>
                      );
                    },
                  )
                ) : (
                  <button
                    aria-current="page"
                    className={`relative  z-10  inline-flex  items-center bg-indigo-600  px-4   py-2 text-sm font-semibold   text-white  ring-1   ring-inset hover:ring-0 focus:z-20 focus:outline-offset-0 focus-visible:outline   focus-visible:outline-2   focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-400 dark:text-gray-600 dark:ring-gray-300`}
                  >
                    1
                  </button>
                )}
                <button
                  className="relative inline-flex items-center rounded-r-md px-5 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-white"
                  onClick={() => {
                    if (Math.ceil(total / limit) > page.value) {
                      setPage({ value: page.value + 1 });
                    }
                  }}
                >
                  <span>
                    {" "}
                    <MdNavigateNext />{" "}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-4"></div>
    </div>
  );
};

export default Filter;
