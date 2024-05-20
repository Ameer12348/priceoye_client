import { useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { proxy } from "../../constants";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
const UserOrders = () => {
  const auth = useSelector((x) => x.auth);
  const [showUser, setShowUser] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${proxy}/userorders`, {
          headers: {
            Authorization: auth.token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white  dark:bg-main-darker">
      {/* loading div start  */}
      {loading ? (
        <div className="fixed  left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#00000048] duration-0">
          <div className="h-10 w-10 animate-spin rounded-[50%] border-[5px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
        </div>
      ) : (
        <></>
      )}
      {/* loading div end  */}
      <div className="bg-main-lighter  px-3 py-2 dark:bg-main-darker md:hidden">
        <button
          className="text-dark text-4xl text-main-dark dark:text-main-lighter"
          onClick={() => {
            if (!showUser) {
              setShowUser(true);
            }
          }}
        >
          <HiBars3 />
        </button>
      </div>
      <div className=" flex min-h-screen justify-between">
        <div
          className={`max-md:fixed max-md:left-0 max-md:top-0 max-md:z-[3000]  max-md:h-screen   max-md:bg-[#00000077] ${showUser ? "max-md:w-screen" : ""}`}
          onClick={() => {
            if (showUser) {
              setShowUser(false);
            }
          }}
        >
          <div
            className={` top-0 h-full w-[300px] bg-[#f1f3f6] px-2 pt-5 dark:bg-main-darker max-md:fixed max-md:z-[10000] max-md:h-screen max-md:pt-20 max-[400px]:w-full ${showUser ? "left-0" : "-left-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="my-2 rounded bg-main-light py-2.5 ps-5 text-white dark:bg-main-dark">
              <Link to={"/user/profile"}>User</Link>
            </div>
            <div className="my-2 rounded bg-main-dark py-2.5 ps-5 text-white dark:bg-main-light">
              <Link to={"/user/orders"}>My Orders</Link>
            </div>

            <button
              className="absolute right-10 top-10 text-main-dark dark:text-main-lighter md:hidden"
              onClick={() => {
                if (showUser) {
                  setShowUser(false);
                }
              }}
            >
              close
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <div className=" mx-auto min-h-screen max-w-[1400px] flex-grow px-3 md:px-4 lg:px-7">
            <h1 className="pb-3 pt-5 text-center text-2xl font-medium dark:text-white">
              Orders
            </h1>
            {orders.length > 0 ? (
              <></>
            ) : (
              <p className="  py-3 text-center text-xl text-green-800 dark:text-green-300">
                {" "}
                Empty
              </p>
            )}
            {orders.map((order, index) => {
              return (
                <OrderCard
                  key={order._id}
                  index={index}
                  order={order}
                  setOrders={setOrders}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
