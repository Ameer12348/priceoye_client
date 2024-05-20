import { useEffect, useRef, useState } from "react";
import { proxy } from "../../constants";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import UserDetailsCard from "./UserDetailsCard";

const AdminOrderCard = ({ order, index, setOrders }) => {
  const auth = useSelector((x) => x.auth);
  let orderStatuses = [
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const selectStatus = useRef();
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [updatePending, setUpdatePending] = useState(false);

  const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  let totalPrice = 0;
  order.products.map((product) => (totalPrice += product.newPrice));
  useEffect(() => {
    selectStatus.current.value = order.status;
  }, []);
  const deleteHandler = async () => {
    setDeletePending(true);
    try {
      const response = await fetch(`${proxy}/deleteorder/${order._id}`, {
        method: "DELETE",
        body: JSON.stringify({ action: "delete" }),
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
      });
      const jsondata = await response.json();
      const data = jsondata;
      if (response.ok) {
        setOrders(data.orders);
        setDeletePending(false);
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
        setShowDeleteBox(false);
      } else {
        setDeletePending(false);
        toast.error(data.error, {
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
        setShowDeleteBox(false);
      }
    } catch (error) {
      console.log(error);
      setDeletePending(false);
      setShowDeleteBox(false);
    }
  };

  const updateHandler = async () => {
    setUpdatePending(true);
    try {
      const response = await fetch(`${proxy}/updateorder/${order._id}`, {
        method: "PUT",
        body: JSON.stringify({ action: selectStatus.current.value }),
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
      });
      const jsondata = await response.json();
      const data = jsondata;
      if (response.ok) {
        setOrders(data.orders);
        setUpdatePending(false);
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
      } else {
        setUpdatePending(false);
        toast.error(data.error, {
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
      }
    } catch (error) {
      setUpdatePending(false);
      console.log(error);
    }
  };

  return (
    <div className="relative  mb-10  w-full max-w-full rounded border border-main-dark pb-3">
      {order.status === "Cancelled" || order.status === "Delivered" ? (
        <>
          {/* delete button  */}
          <button
            className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/4 items-center justify-center rounded bg-red-500  p-2 text-sm dark:bg-red-700  dark:text-gray-100  "
            onClick={() => {
              setShowDeleteBox(true);
            }}
          >
            <span>Delete</span>
          </button>
        </>
      ) : (
        <></>
      )}

      <table className="mb-5 w-full max-w-full border-collapse border-b border-main-dark">
        <thead>
          <tr className="bg-main-dark  ">
            <th className="border border-main-dark px-2 py-2 text-gray-200">
              {"#"}
            </th>
            <th className="border border-main-dark py-2 text-gray-200">
              Status
            </th>
            <th className="border border-main-dark py-2 text-gray-200">
              Order Date
            </th>
            <th className="border border-main-dark py-2 text-gray-200">
              Payment
            </th>
            <th className="border border-main-dark py-2 text-gray-200">
              Quantity
            </th>
            <th className="border border-main-dark py-2 text-gray-200">
              Total{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-main-dark py-2 text-center dark:text-white">
              {index + 1}{" "}
            </td>
            <td className="border border-main-dark py-0.5  text-center dark:text-white">
              <div
                className={`${updatePending ? "" : "hidden"} mx-auto h-7 w-7  animate-spin  rounded-[50%] border-[3px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]`}
              ></div>
              <select
                className={`${updatePending ? "hidden" : ""} border bg-transparent px-1 py-1.5 outline-0 dark:border-blue-900`}
                ref={selectStatus}
                onChange={updateHandler}
              >
                {orderStatuses.map((status, index) => {
                  return (
                    <option
                      key={index}
                      className="my-1.5 dark:bg-main-dark"
                      value={status}
                    >
                      {status}{" "}
                    </option>
                  );
                })}
              </select>
            </td>
            <td className="border border-main-dark py-2 text-center dark:text-white">
              {orderDate}
            </td>
            <td className="border border-main-dark py-2 text-center dark:text-white">
              {order.paymentType}
            </td>
            <td className="border border-main-dark py-2 text-center dark:text-white">
              {order.products.length}
            </td>
            <td className="text-nowrap border border-main-dark py-2 text-center dark:text-white">
              Rs {totalPrice} /-
            </td>
          </tr>
        </tbody>
      </table>
      <UserDetailsCard _id={order.buyer} />
      {order.products.map((product) => {
        return (
          <div
            key={product._id}
            className="mx-5 mb-2     rounded border border-blue-200 dark:border-blue-900 dark:bg-main-dark"
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
                <div className="text-nowrap text-green-800 dark:text-green-500">
                  <span className="text-green-950 dark:text-green-600">
                    Price :
                  </span>{" "}
                  Rs. {product.newPrice} /-
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* delete box  */}
      <div
        className={`fixed   left-0 top-0  z-[3000] flex  w-screen  items-center justify-center bg-[#00000038] duration-0 ${showDeleteBox ? "h-screen" : "h-0"}`}
      >
        <div
          className={`bg-white p-10 duration-0 dark:bg-main-darker ${showDeleteBox ? "scale-100" : " scale-0"}`}
        >
          <p className="text-xl dark:text-white">
            Are you sure you want to delete this
          </p>
          <div className="flex justify-between px-5 pt-10 ">
            <button
              className="me-2 rounded  bg-green-600 px-2 py-1 text-white dark:bg-green-800"
              onClick={() => {
                setShowDeleteBox(false);
              }}
            >
              Cancel
            </button>
            <button
              className="me-2 rounded  bg-red-600 px-2 py-1 text-white dark:bg-red-800 "
              onClick={deleteHandler}
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

export default AdminOrderCard;
