import { useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { proxy } from "../../constants";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
const Products = () => {
  const [showDash, setShowDash] = useState(false);
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((x) => x.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setPending(true);
        const response = await fetch(`${proxy}/products`);
        const jsondata = await response.json();
        const data = jsondata;
        if (response.ok) {
          setPending(false);
          setProducts(data.products);
        }
        if (!response.ok) {
          setPending(false);
        }
      } catch (error) {
        if (!error.success) {
          setPending(false);
        }
      }
    };
    getProducts();
  }, [auth.token]);

  return (
    <div className="bg-white dark:bg-main-darker">
      {pending ? (
        <div className="fixed left-0 top-0 z-[100000] flex h-screen w-screen items-center justify-center bg-[#00000080] ">
          <div className="h-10 w-10 animate-spin rounded-[50%] border-[5px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
        </div>
      ) : (
        <></>
      )}
      <div className="bg-main-lighter  px-3 py-2 dark:bg-main-darker md:hidden">
        <button
          className="text-dark text-4xl text-main-dark dark:text-main-lighter"
          onClick={() => {
            if (!showDash) {
              setShowDash(true);
            }
          }}
        >
          <HiBars3 />
        </button>
      </div>
      <div className=" flex min-h-screen justify-between">
        <div
          className={`max-md:fixed max-md:left-0 max-md:top-0 max-md:z-[3000]  max-md:h-screen   max-md:bg-[#00000077] ${showDash ? "max-md:w-screen" : ""}`}
          onClick={() => {
            if (showDash) {
              setShowDash(false);
            }
          }}
        >
          <div
            className={` top-0 h-full w-[300px] bg-[#f1f3f6] px-2 pt-5 dark:bg-main-darker max-md:fixed max-md:z-[10000] max-md:h-screen max-md:pt-20 max-[400px]:w-full ${showDash ? "left-0" : "-left-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="my-2 rounded bg-main-dark py-2.5 ps-5 text-white dark:bg-main-light ">
              <Link to={"/admin/products"}>Products</Link>
            </div>
            <div className="my-2 rounded bg-main-light py-2.5 ps-5 text-white dark:bg-main-dark ">
              <Link to={"/admin/users"}>Users</Link>
            </div>
            <div className="my-2 rounded bg-main-light py-2.5 ps-5 text-white dark:bg-main-dark ">
              <Link to={"/admin/reviews"}>Reviews</Link>
            </div>
            <div className="my-2 rounded bg-main-light py-2.5 ps-5 text-white dark:bg-main-dark ">
              <Link to={"/admin/orders"}>Orders</Link>
            </div>
            <button
              className="absolute right-10 top-10 text-main-dark dark:text-main-lighter md:hidden"
              onClick={() => {
                if (showDash) {
                  setShowDash(false);
                }
              }}
            >
              close
            </button>
          </div>
        </div>

        <div className="flex-grow">
          <div className=" mx-auto max-w-[1400px] flex-grow ">
            <h1 className="  py-3 text-center text-3xl text-main-darker dark:text-green-400">
              {" "}
              Products{" "}
            </h1>
            {products.length < 1 ? (
              <p className="   text-center text-xl text-green-800 dark:text-green-300">
                {" "}
                Empty
              </p>
            ) : (
              <></>
            )}
            <div className="flex justify-end px-10">
              <button className="group/create relative mb-3 flex items-center  gap-2 rounded bg-green-400  px-3 py-1 text-lg text-white dark:bg-green-700">
                <FaPlus />
                New
                <div className="absolute  right-0 top-[120%] z-50 max-h-0 overflow-hidden rounded bg-green-500 text-left group-focus/create:max-h-[1000px] dark:bg-green-800">
                  <div>
                    <div
                      className="mx-2 my-1 block text-nowrap border-b border-green-400 py-1 text-base dark:border-green-700"
                      onClick={() => {
                        navigate("/admin/createproduct/mobile");
                      }}
                    >
                      Mobile
                    </div>
                    <div
                      className="mx-2 my-1 block text-nowrap border-b border-green-400 py-1 text-base dark:border-green-700"
                      onClick={() => {
                        navigate("/admin/createproduct/tablet");
                      }}
                    >
                      Tablet
                    </div>
                    <div
                      className="mx-2 my-1 block text-nowrap border-b border-green-400 py-1 text-base dark:border-green-700"
                      onClick={() => {
                        navigate("/admin/createproduct/earbuds");
                      }}
                    >
                      Ear buds
                    </div>
                    <div
                      className="mx-2 my-1 block text-nowrap  py-1 text-base "
                      onClick={() => {
                        navigate("/admin/createproduct/smartwatch");
                      }}
                    >
                      SmartWatch
                    </div>
                  </div>
                </div>
              </button>
            </div>
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
