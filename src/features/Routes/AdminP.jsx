import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { proxy } from "../../constants";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [errors, setErrorS] = useState(false);
  const auth = useSelector((x) => x.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [unauth, setunauth] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await fetch(`${proxy}/auth/v1/getadmin`, {
          method: "GET",
          headers: {
            Authorization: `${auth.token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          setErrorS(true);
        }
        if (response.status === 401) {
          setunauth(true);
        }
        const jsondata = await response.json();
        const data = jsondata;
        if (data.success) {
          setOk(true);
        } else {
          setOk(false);
          setErrorS(true);
        }
      } catch (error) {
        if (!error.success) {
          setErrorS(true);
        }
      }
    };
    if (auth.token) {
      authCheck();
    } else {
      setErrorS(true);
    }
  }, [auth.token, location]);
  return ok ? (
    <Outlet />
  ) : (
    <div className="flex min-h-[70vh] items-center justify-center dark:bg-main-darker">
      {!errors ? (
        <div className="h-10 w-10 animate-spin rounded-[50%] border-[5px] border-[rgba(0,0,0,0.2)] border-t-[rgba(0,0,0,0.7)] dark:border-[rgba(255,255,255,0.2)] dark:border-t-[rgba(255,255,255,0.7)]"></div>
      ) : (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#00000048] duration-0">
          <div className="rounded bg-white p-10">
            <p className="text-center text-lg text-main-darker">
              {unauth
                ? "Unauthorized Access "
                : "An error occured while Accessing this Page"}
            </p>
            <p className="text-center text-sm text-gray-700">
              {unauth
                ? " Only Admin Can access this page "
                : "Please Login Again to Solve This Issue "}
            </p>
            <div className="mt-5 bg-main-darker  text-center text-main-lighter">
              {unauth ? (
                <button
                  className="inline-block w-full p-3"
                  to={"/login"}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go to Homepage
                </button>
              ) : (
                <button
                  className="inline-block w-full p-3"
                  to={"/login"}
                  onClick={() => {
                    navigate("/login", {
                      state: location.pathname,
                    });
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Private;
