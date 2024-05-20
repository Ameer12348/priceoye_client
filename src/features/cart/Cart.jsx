import { useDispatch, useSelector } from "react-redux";
import { proxy } from "../../constants";
import { clearCart, removeItem } from "../../app/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";

const Cart = () => {
  const auth = useSelector((x) => x.auth);
  const cart = useSelector((x) => x.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [orderCartPending, setOrderCartPending] = useState(false);
  let total = 0;
  cart.items.map((item) => {
    total += item.newPrice;
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const orderHandler = async () => {
    setOrderCartPending(true);
    try {
      const response = await fetch(`${proxy}/createorder`, {
        method: "POST",
        body: JSON.stringify({ products: cart.items }),
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
      });
      const jsondata = await response.json();
      const data = jsondata;
      if (response.status === 201) {
        setOrderCartPending(false);
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
        dispatch(clearCart());
        navigate("/user/orders");
      } else {
        setOrderCartPending(false);
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
      setOrderCartPending(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#f1f3f6] dark:bg-main-darker">
      <h1 className="py-3 text-center text-4xl font-medium text-gray-700 dark:text-gray-200 ">
        Cart
      </h1>
      <div>
        <div className="mx-auto grid  grid-cols-1 gap-2 px-5 py-5 2xl:container md:grid-cols-12 md:px-10">
          <div className="md:col-span-8">
            {cart.items.length > 0 ? (
              <></>
            ) : (
              <h1 className="text-center text-lg font-medium dark:text-white">
                Empty
              </h1>
            )}
            {cart.items.map((item) => {
              return (
                <div
                  key={item._id}
                  className="mx-2 mb-2 rounded   border border-blue-200 bg-white dark:border-blue-900 dark:bg-main-dark"
                >
                  <div className="flex flex-row items-center gap-2 px-10 pb-2 pt-4 max-[600px]:flex-col">
                    <div className="">
                      <img
                        className="aspect-square w-32 object-contain"
                        src={`${proxy}/${item.thumbnail}`}
                        alt=""
                      />{" "}
                    </div>
                    <div className="flex-grow text-lg text-gray-700 dark:text-gray-300">
                      {item.title}
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="text-green-800 dark:text-green-500">
                        Rs. {item.newPrice} {" /- "}
                      </div>
                      <div>
                        <button
                          className="me-2 rounded  bg-red-600 px-2 py-0.5 text-white dark:bg-red-800"
                          onClick={() => {
                            dispatch(removeItem(item._id));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* delete and update button  */}
                </div>
              );
            })}
          </div>
          <div className="md:col-span-4">
            <div className="mx-2 rounded border border-blue-200 bg-white p-4 dark:bg-main-dark">
              <h4 className="pb-4 text-xl dark:text-white ">Order Summary</h4>
              <div className="flex justify-between border-b border-blue-200 py-3">
                <div className=" text-gray-700 dark:text-gray-300">
                  Total Items
                </div>
                <div className=" px-5 text-gray-700 dark:text-gray-300">
                  {cart.items.length}{" "}
                </div>
              </div>
              <div className="flex justify-between border-b border-blue-200 py-3">
                <div className=" text-gray-700 dark:text-gray-300">
                  Subtotal
                </div>
                <div className=" px-5 text-gray-700 dark:text-gray-300">
                  Rs. {total}
                  {" /- "}
                </div>
              </div>
              {cart.items.length > 0 ? (
                <div className="flex justify-between border-b border-blue-200 py-3">
                  <div className=" text-gray-700 dark:text-gray-300">
                    Delivery Type
                  </div>
                  <div className=" px-5 text-gray-700 dark:text-gray-300">
                    COD (Cash On Delivery)
                  </div>
                </div>
              ) : (
                <></>
              )}

              {cart.items.length > 0 ? (
                <div className="  pt-5">
                  {auth.token ? (
                    <button
                      className="w-full rounded bg-green-400 p-1.5 text-lg font-medium text-white dark:bg-green-600"
                      onClick={orderHandler}
                    >
                      {orderCartPending ? (
                        <div className="mx-auto h-7 w-7 animate-spin rounded-[50%] border-[3px] border-[rgba(255,255,255,0.2)] border-t-[rgba(255,255,255,0.7)] dark:border-[rgba(0,0,0,0.2)] dark:border-t-[rgba(0,0,0,0.7)]"></div>
                      ) : (
                        "Order"
                      )}
                    </button>
                  ) : (
                    <button
                      className="w-full rounded bg-red-400 p-1.5 text-lg font-normal text-white dark:bg-red-600"
                      onClick={() => {
                        navigate("/login", {
                          state: location.pathname,
                        });
                      }}
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
