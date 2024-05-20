import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { proxy } from "../../constants";
import { HiBars3 } from "react-icons/hi2";
import RateCard from "./RateCard";
const Reviews = () => {
  const [showDash, setShowDash] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [pending, setPending] = useState(false);
  const auth = useSelector((x) => x.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getreviews = async () => {
      setPending(true);
      try {
        const response = await fetch(`${proxy}/getnotallowedreviews`, {
          method: "GET",
          headers: {
            Authorization: `${auth.token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          setPending(false);
        }
        const jsondata = await response.json();
        const data = jsondata;
        if (data.success) {
          setReviews(data.reviews);
          setPending(false);
        } else {
          setPending(false);
        }
      } catch (error) {
        if (!error.success) {
          setPending(false);
        }
      }
    };
    getreviews();
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
            <div className="my-2 rounded bg-main-light py-2.5 ps-5 text-white dark:bg-main-dark ">
              <Link to={"/admin/products"}>Products</Link>
            </div>
            <div className="my-2 rounded bg-main-light py-2.5 ps-5 text-white dark:bg-main-dark ">
              <Link to={"/admin/users"}>Users</Link>
            </div>
            <div className="my-2 rounded bg-main-dark py-2.5 ps-5 text-white dark:bg-main-light ">
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
              Not allowed Reviews{" "}
            </h1>
            {reviews.length < 1 ? (
              <p className="  py-3 text-center text-xl text-green-800 dark:text-green-300">
                {" "}
                Empty
              </p>
            ) : (
              <></>
            )}
            {reviews.map((review) => {
              return (
                <RateCard
                  key={review._id}
                  reviews={reviews}
                  setReviews={setReviews}
                  review={review}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
