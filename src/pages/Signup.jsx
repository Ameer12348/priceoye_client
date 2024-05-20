import { useEffect, useRef, useState } from "react";
import login_img from "../features/media/images/login-header-img.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { proxy } from "../constants";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/authSlice";
import { Flip, toast } from "react-toastify";

const Signup = () => {
  const name = useRef();
  const name_required = useRef();
  const email = useRef();
  const email_required = useRef();
  const Invalid_email = useRef();
  const phone = useRef();
  const phone_required = useRef();
  const invalid_phone = useRef();
  const address = useRef();
  const address_required = useRef();
  const passtoggle = useRef();
  const password1 = useRef();
  const password_required = useRef();
  const invalid_pass = useRef();
  const password2 = useRef();
  const password_match = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    // name required check
    if (pending) {
      return e.preventDefault();
    }
    setPending(true);
    if (name.current.value === "") {
      name_required.current.style.display = "block";
      setTimeout(() => {
        name_required.current.style.display = "none";
      }, 4000);
      setPending(false);
      return name.current.focus();
    }
    // email required check
    if (email.current.value === "") {
      email_required.current.style.display = "block";
      setTimeout(() => {
        email_required.current.style.display = "none";
      }, 4000);
      setPending(false);
      return email.current.focus();
    }
    // invalid email check
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
    // phone required check
    if (phone.current.value === "") {
      phone_required.current.style.display = "block";
      setTimeout(() => {
        phone_required.current.style.display = "none";
      }, 4000);
      setPending(false);
      return phone.current.focus();
    }
    // address required check
    if (address.current.value === "") {
      address_required.current.style.display = "block";
      setTimeout(() => {
        address_required.current.style.display = "none";
      }, 4000);
      return address.current.focus();
    }
    // password required check
    if (password1.current.value === "") {
      password_required.current.style.display = "block";
      setTimeout(() => {
        password_required.current.style.display = "none";
      }, 4000);
      setPending(false);
      return password1.current.focus();
    }
    // invalid password check
    if (!/^(?=.*[a-zA-Z]).{6,}$/.test(password1.current.value)) {
      invalid_pass.current.style.display = "block";
      setTimeout(() => {
        invalid_pass.current.style.display = "none";
      }, 4000);
      setPending(false);
      return password1.current.focus();
    }
    // password match check
    if (password1.current.value !== password2.current.value) {
      password_match.current.style.display = "block";
      setTimeout(() => {
        password_match.current.style.display = "none";
      }, 4000);
      setPending(false);
      return password2.current.focus();
    }
    try {
      const rawdata = await fetch(`${proxy}/auth/v1/register`, {
        method: "POST",
        body: JSON.stringify({
          name: name.current.value,
          email: email.current.value,
          password: password1.current.value,
          phone: phone.current.value,
          address: address.current.value,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const jsondata = await rawdata.json();
      const data = jsondata;
      if (data.success) {
        dispatch(setAuth({ user: data.user, token: data.token }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: data.user, token: data.token }),
        );
        setPending(false);
        toast.success("Registered Successfully", {
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
      console.log(data);
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
    <div className="min-h-[70vh] py-10 dark:bg-main-darker">
      <div className=" mx-auto  max-w-[500px] overflow-hidden rounded-lg border dark:border-main-light dark:bg-main-dark max-[500px]:mx-2">
        <div className="aspect-[500/160] w-full">
          <img src={login_img} className="w-full " alt="phone image" />
        </div>
        <div className="px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="my-2 text-2xl font-semibold text-gray-700 dark:text-main-lighter ">
              Sign Up
            </h1>
            <p>
              {" "}
              <span className="me-1 text-sm text-gray-500 dark:text-gray-200">
                Already have{" "}
              </span>{" "}
              <Link
                className="text-blue-500 underline dark:text-blue-300"
                to={"/login"}
              >
                Login
              </Link>
            </p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-200">
            Please fill the details for sign up
          </p>
        </div>
        <form className="px-5" onSubmit={submitHandler}>
          {/* name  */}
          <div className="py-2">
            <input
              type="text"
              id="name"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              placeholder="Name"
              ref={name}
            />
            <p
              className="hidden pt-0.5 text-sm  text-red-500 dark:text-red-300"
              ref={name_required}
            >
              name required
            </p>
          </div>
          {/* email  */}
          <div className="py-2">
            <input
              type="email"
              id="email"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
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
              className="hidden pt-0.5 text-sm  text-red-500 dark:text-red-300"
              ref={Invalid_email}
            >
              Invalid email
            </p>
          </div>
          {/* phone  */}
          <div className="py-2">
            <input
              type="tel"
              id="phone"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              placeholder="Phone"
              ref={phone}
            />
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={phone_required}
            >
              contact number required
            </p>
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={invalid_phone}
            >
              invalid phone
            </p>
          </div>
          {/* address  */}
          <div className="py-2">
            <textarea
              id="address"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              placeholder="Address"
              ref={address}
            ></textarea>
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={address_required}
            >
              address required
            </p>
          </div>
          {/* password */}
          <div className="py-2">
            <input
              type="password"
              id="password"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              placeholder="Password"
              ref={password1}
            />
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={password_required}
            >
              password required
            </p>
            <p
              className="hidden pt-0.5 text-sm text-red-500  dark:text-red-300"
              ref={invalid_pass}
            >
              password must have 6 characters and 1 letter
            </p>
          </div>
          {/* confirm password  */}
          <div className="py-2">
            <input
              id="password"
              type="password"
              className="w-full rounded border border-blue-300 p-2 outline-0 dark:bg-main-lighter dark:text-main-dark placeholder:dark:text-main-dark"
              placeholder="Confirm password"
              ref={password2}
            />
            <p
              className="hidden pt-0.5 text-sm  text-red-500 dark:text-red-300"
              ref={password_match}
            >
              both passwords are not matching
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
                    password1.current.type = "text";
                    password2.current.type = "text";
                  } else {
                    password1.current.type = "password";
                    password2.current.type = "password";
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
          </div>
          <div className="mb-5 mt-2 py-2">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-main-light p-2 text-white dark:bg-blue-200 dark:text-main-dark"
            >
              {pending ? (
                <div className="h-7 w-7 animate-spin rounded-[50%]  border-[3px] border-[rgba(255,255,255,0.2)] border-t-[rgba(255,255,255,0.7)] dark:border-[rgba(0,0,0,0.2)] dark:border-t-[rgba(0,0,0,0.7)]"></div>
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
