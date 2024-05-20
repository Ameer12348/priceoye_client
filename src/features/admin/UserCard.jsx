import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { proxy } from "../../constants";
import { Flip, toast } from "react-toastify";

const UserCard = ({ user, index, setUsers }) => {
  const auth = useSelector((x) => x.auth);
  const userRole = useRef();
  const [updatePending, setUpdatePending] = useState(false);

  useEffect(() => {
    userRole.current.value = user.role;
  }, []);

  const updateHandler = async () => {
    setUpdatePending(true);
    try {
      const response = await fetch(
        `${proxy}/auth/v1/updateuserrole/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ action: userRole.current.value }),
          headers: {
            Authorization: auth.token,
            "Content-Type": "application/json",
          },
        },
      );
      const jsondata = await response.json();
      const data = jsondata;
      if (response.ok) {
        setUsers(data.users);
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
    <div
      className={`${auth.user.email === user.email ? "hidden" : ""} mb-4 rounded border border-main-dark px-2 py-4 lg:px-10`}
    >
      <p className="flex  py-1 text-sm dark:text-gray-200">
        <span className="block w-[10%] font-medium dark:text-white max-[600px]:w-[17%]  md:max-[910px]:w-1/5">
          Name:{" "}
        </span>
        {user.name}
      </p>
      <p className="flex  py-1 text-sm dark:text-gray-200">
        <span className="block w-[10%] font-medium dark:text-white max-[600px]:w-[17%]  md:max-[910px]:w-1/5">
          Email:{" "}
        </span>
        {user.email}
      </p>
      <p className="flex  py-1 text-sm dark:text-gray-200">
        <span className="block w-[10%] font-medium dark:text-white max-[600px]:w-[17%]  md:max-[910px]:w-1/5">
          Phone:{" "}
        </span>
        {user.phone}
      </p>
      <p className="flex  py-1 text-sm dark:text-gray-200">
        <span className="block w-[10%] font-medium dark:text-white max-[600px]:w-[17%]  md:max-[910px]:w-1/5">
          Address:{" "}
        </span>
        {user.address}
      </p>
      <div className="flex items-center  py-1 text-sm dark:text-gray-200">
        <span className="block w-[10%] font-medium dark:text-white max-[600px]:w-[17%]  md:max-[910px]:w-1/5">
          Role:
        </span>
        <span>
          {" "}
          <div
            className={`${updatePending ? "" : "hidden"} mx-auto h-7 w-7  animate-spin  rounded-[50%] border-[3px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]`}
          ></div>
        </span>
        <select
          className={`${updatePending ? "hidden" : ""} border bg-transparent px-6 py-1 text-sm outline-0 dark:border-blue-900`}
          ref={userRole}
          onChange={updateHandler}
        >
          <option className="my-1.5 text-sm dark:bg-main-dark" value="USER">
            USER
          </option>
          <option className="my-1.5 text-sm dark:bg-main-dark" value="ADMIN">
            ADMIN
          </option>
        </select>
      </div>
    </div>
  );
};

export default UserCard;
