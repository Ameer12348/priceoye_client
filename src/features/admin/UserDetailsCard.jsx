import React, { useEffect, useState } from "react";
import { proxy } from "../../constants";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";

const UserDetailsCard = ({ _id }) => {
  const auth = useSelector((x) => x.auth);
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      setPending(true);
      try {
        const response = await fetch(`${proxy}/auth/v1/getsingleuser/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        });
        const jsondata = await response.json();
        const data = jsondata;
        setUser(data.user);
        if (data.success) {
          setPending(false);
        } else {
          setPending(false);
        }
      } catch (error) {
        setPending(false);
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="mx-5 mb-5 rounded border border-main-dark px-2 py-4">
      <div>
        <h3 className="text-center font-medium dark:text-white">
          Buyer Details
        </h3>
      </div>
      <div>
        {pending ? (
          <div
            className={` mx-auto my-5 h-7 w-7  animate-spin  rounded-[50%] border-[3px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]`}
          ></div>
        ) : (
          <>
            {user !== null ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetailsCard;
