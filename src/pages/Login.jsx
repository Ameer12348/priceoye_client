import { useEffect, useRef, useState } from "react";
import login_img from "../features/media/images/login-header-img.svg";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { proxy } from "../constants/index";
import { setAuth } from "../app/authSlice";
import { useDispatch } from "react-redux";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const email = useRef();
  const email_required = useRef();
  const Invalid_email = useRef();
  const password = useRef();
  const password_required = useRef();
  const passtoggle = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (pending) {
      return e.preventDefault();
    }
    setPending(true);
    if (email.current.value === "") {
      email_required.current.style.display = "block";
      setTimeout(() => {
        email_required.current.style.display = "none";
      }, 4000);
      setPending(false);
      return email.current.focus();
    }
    if (
      !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(
        email.current.value,
      )
    ) {
      Invalid_email.current.style.display = "block";
      setTimeout(() => {
        Invalid_email.current.style.display = "none";
      }, 4000);
      setPending(false);
      return email.current.focus();
    }
    if (password.current.value === "") {
      password_required.current.style.display = "block";
      setTimeout(() => {
        password_required.current.style.display = "none";
      }, 4000);
      setPending(false);
      return password.current.focus();
    }
    try {
      const rawdata = await fetch(`${proxy}/auth/v1/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const jsondata = await rawdata.json();
      const data = jsondata;
      console.log(data);
      if (data.success) {
        dispatch(setAuth({ user: data.user, token: data.token }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: data.user, token: data.token }),
        );
        setPending(false);
        toast.success("Login Successfully", {
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
        navigate(location.state || "/");
      } else {
        setPending(false);
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
      setPending(false);
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
      console.log(error);
    }
  };
  return (
    <div className="min-h-[70vh] py-20 dark:bg-main-darker">
      <div className=" mx-auto  max-w-[500px] overflow-hidden rounded-lg border dark:border-main-light dark:bg-main-dark max-[500px]:mx-2">
        <div className="aspect-[500/160] w-full">
          <img src={login_img} className="w-full " alt="phone image" />
        </div>
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="my-2 text-2xl font-semibold text-gray-700 dark:text-main-lighter ">
              Login
            </h1>
            <p>
              {" "}
              <span className="me-1 text-sm text-gray-500 dark:text-gray-200">
                Don&apos;t have{" "}
              </span>{" "}
              <Link
                className="text-blue-500 underline dark:text-blue-300"
                to={"/signup"}
              >
                Sign Up
              </Link>
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Please Enter your password and email for Login
          </p>
        </div>
        <form className="px-5" onSubmit={submitHandler}>
          {/* email  */}
          <div className="py-2">
            <input
              type="email"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              id="email"
              placeholder="Email"
              ref={email}
            />
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={email_required}
            >
              email required
            </p>

            <p
              className=" hidden pt-0.5  text-sm text-red-500 dark:text-red-300"
              ref={Invalid_email}
            >
              Invalid email
            </p>
          </div>
          {/* password */}
          <div className="py-2">
            <input
              type="password"
              id="password"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              placeholder="Password"
              ref={password}
            />
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={password_required}
            >
              password required
            </p>
          </div>
          {/* password toggle and forgot pass  */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center justify-start gap-2 ">
              <input
                type="checkbox"
                name=""
                id="showpass"
                className="cursor-pointer rounded "
                ref={passtoggle}
                onClick={() => {
                  if (passtoggle.current.checked) {
                    password.current.type = "text";
                  } else {
                    password.current.type = "password";
                  }
                }}
              />
              <label
                htmlFor="showpass"
                className="cursor-pointer text-sm text-gray-500 dark:text-gray-200"
              >
                Show Password
              </label>
            </div>
            <div>
              <Link className="text-sm text-gray-500 dark:text-gray-200">
                Forgot Passsword
              </Link>
            </div>
          </div>
          <div className="mb-5 mt-2 py-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-main-light p-2 text-white dark:bg-blue-200 dark:text-main-dark"
            >
              {pending ? (
                <div className="h-7 w-7 animate-spin rounded-[50%]  border-[3px] border-[rgba(255,255,255,0.2)] border-t-[rgba(255,255,255,0.7)] dark:border-[rgba(0,0,0,0.2)] dark:border-t-[rgba(0,0,0,0.7)]"></div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
