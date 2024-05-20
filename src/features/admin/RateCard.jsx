import React, { useState } from "react";
import { PiStarThin } from "react-icons/pi";
import { Flip, toast } from "react-toastify";
import { proxy } from "../../constants";
import { useSelector } from "react-redux";

const RateCard = ({ reviews, setReviews, review }) => {
  const [allowPending, setAllowPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const auth = useSelector((x) => x.auth);

  return (
    <div className="mx-2 mb-2 rounded   border border-blue-200 dark:border-blue-900 dark:bg-main-dark">
      <div className="px-10 pt-2 text-left font-semibold text-gray-700  dark:text-gray-200">
        <span className="font-normal">By :</span> {review.user.name}
      </div>
      <div className="flex items-center justify-start  gap-2 px-10 pt-1 text-center dark:text-main-light">
        <PiStarThin /> <span>rating: </span>
        <span>{review.rate} </span>
      </div>
      <div className="px-10 pb-1 text-green-900 dark:text-green-400">
        <b className="text-green-950 dark:text-green-600">Comment:</b>{" "}
        {review.comment}
      </div>
      <div className="flex px-10 pb-3 pt-1">
        <button
          className="me-2 rounded  bg-green-600 px-2 py-0.5 text-white dark:bg-green-800"
          onClick={async () => {
            if (allowPending) {
              return "";
            }
            if (deletePending) {
              return "";
            }
            try {
              setAllowPending(true);
              const response = await fetch(
                `${proxy}/updatereview/${review.pid}/${review._id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({ action: true }),
                  headers: {
                    Authorization: `${auth.token}`,
                    "Content-Type": "application/json",
                  },
                },
              );
              const jsondata = await response.json();
              const data = jsondata;
              if (response.ok) {
                setAllowPending(false);
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
                  (rev) => rev._id !== review._id,
                );
                setTimeout(() => {
                  setReviews(filterreviews);
                }, 500);
              }
              if (!response.ok) {
                setAllowPending(false);
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
                setAllowPending(false);
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
          {allowPending ? (
            <div className="mx-2 h-6 w-6 animate-spin rounded-[50%]  border-[2px]  border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
          ) : (
            "Allow"
          )}
        </button>
        <button
          className="me-2 rounded  bg-red-600 px-2 py-0.5 text-white dark:bg-red-800"
          onClick={async () => {
            if (allowPending) {
              return "";
            }
            if (deletePending) {
              return "";
            }
            try {
              setDeletePending(true);
              const response = await fetch(
                `${proxy}/deletereview/${review.pid}/${review._id}`,
                {
                  method: "DELETE",
                  body: JSON.stringify({ action: true }),
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
                  (rev) => rev._id !== review._id,
                );
                setTimeout(() => {
                  setReviews(filterreviews);
                }, 500);
              }
              if (!response.ok) {
                setDeletePending(false);
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
  );
};

export default RateCard;
