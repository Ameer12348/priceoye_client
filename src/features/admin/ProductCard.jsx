import React, { useState } from "react";
import { Flip, toast } from "react-toastify";
import { proxy } from "../../constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, products, setProducts }) => {
  const [deletePending, setDeletePending] = useState(false);
  const [showdeltebox, setshowdeltebox] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((x) => x.auth);
  return (
    <div
      key={product._id}
      className="mx-2 mb-2    rounded border border-blue-200 dark:border-blue-900 dark:bg-main-dark"
    >
      <div className="flex flex-row items-center gap-2 px-10 pb-2 pt-4 max-[600px]:flex-col">
        <div className="">
          <img
            className="aspect-square w-32 rounded object-contain"
            src={`${proxy}/${product.thumbnail}`}
            alt=""
          />{" "}
        </div>
        <div className="flex-grow text-lg text-gray-700 dark:text-gray-300">
          {product.title}
        </div>
        <div className="flex flex-col">
          {product.lastPrice ? (
            <div className="text-green-800 dark:text-green-500">
              <span className="text-green-950 dark:text-green-600">
                LastPrice :
              </span>{" "}
              Rs. {product.lastPrice}{" "}
            </div>
          ) : (
            <></>
          )}
          <div className="text-green-800 dark:text-green-500">
            <span className="text-green-950 dark:text-green-600">
              NewPrice :
            </span>{" "}
            Rs. {product.newPrice}{" "}
          </div>
          <div className="text-green-800 dark:text-green-500">
            <span className="text-green-950 dark:text-green-600">Stock :</span>{" "}
            {product.stock}{" "}
          </div>
        </div>
      </div>
      {/* delete and update button  */}
      <div className="flex px-10 pb-3 pt-1 max-[600px]:justify-center">
        <button
          className="me-2 rounded  bg-green-600 px-2 py-0.5 text-white dark:bg-green-800"
          onClick={() => {
            navigate(`/admin/updateproduct/${product.type}/${product.slug}`);
          }}
        >
          Edit
        </button>
        <button
          className="me-2 rounded  bg-red-600 px-2 py-0.5 text-white dark:bg-red-800"
          onClick={() => {
            setshowdeltebox(true);
          }}
        >
          Delete
        </button>
      </div>
      {/* delete box */}
      <div
        className={`fixed   left-0 top-0  z-[3000] flex  w-screen  items-center justify-center bg-[#00000038] duration-0 ${showdeltebox ? "h-screen" : "h-0"}`}
      >
        <div
          className={`bg-white p-10 duration-0 dark:bg-main-darker ${showdeltebox ? "scale-100" : " scale-0"}`}
        >
          <p className="text-xl dark:text-white">
            Do you really want to delete this product
          </p>
          <div className="flex justify-between px-5 pt-10 ">
            <button
              className="me-2 rounded  bg-green-600 px-2 py-1 text-white dark:bg-green-800"
              onClick={() => {
                setshowdeltebox(false);
              }}
            >
              Cancel
            </button>
            <button
              className="me-2 rounded  bg-red-600 px-2 py-1 text-white dark:bg-red-800"
              onClick={async () => {
                if (deletePending) {
                  return "";
                }
                try {
                  setDeletePending(true);
                  const response = await fetch(
                    `${proxy}/deleteproduct/${product._id}`,
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
                    setDeletePending(false);
                    setshowdeltebox(false);
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

                    const filterproducts = products.filter(
                      (pr) => pr._id !== product._id,
                    );
                    setTimeout(() => {
                      setProducts(filterproducts);
                    }, 500);
                  }
                  if (!response.ok) {
                    setDeletePending(false);
                    setshowdeltebox(false);
                    toast.error(response.error, {
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
                  console.log(data);
                } catch (error) {
                  console.log(error);
                  if (!error.success) {
                    setDeletePending(false);
                    setshowdeltebox(false);
                    toast.error(error.error, {
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
                }
              }}
            >
              {deletePending ? (
                <div className="mx-2 h-6 w-6 animate-spin rounded-[50%]  border-[2px]  border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
              ) : (
                "Delete"
              )}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
