import { Link } from "react-router-dom";
import logo from "../media/images/logo.svg";
import payment_method from "../media/images/payment_method.svg";
import google_play from "../media/images/google_play.png";
const main_navigation = [
  {
    name: "About Us",
    slug: "/about-us",
  },
  {
    name: "FAQs",
    slug: "/faqs",
  },
  {
    name: "Contact Us",
    slug: "/contact-us",
  },
  {
    name: "Careers",
    slug: "/careers",
  },
  {
    name: "Press and Blog",
    slug: "/blogs",
  },
  {
    name: "Terms & Conditions",
    slug: "/terms",
  },
];
const customer_care = [
  {
    name: "Help Center",
    slug: "/help-center",
  },
  {
    name: "Privacy Policy",
    slug: "/privacy-policy",
  },
  {
    name: "Installments Plan",
    slug: "/installments-plan",
  },
  {
    name: "E-Warranty Activation",
    slug: "/warranty",
  },
];
const Footer = () => {
  return (
    <footer className=" bg-main-light  dark:bg-main-dark">
      <div className="mx-auto px-7 py-8 xl:container">
        <div className="grid grid-cols-1 min-[576px]:grid-cols-2 md:grid-cols-3">
          {/* main navigation start  */}
          <div>
            {/* logo div start */}
            <Link to={"/"}>
              <img
                src={logo}
                className="w-[130px] dark:[filter:brightness(0.7)] max-[300px]:w-[100px] "
                alt="priceoye logo"
              />
            </Link>
            <ul className="py-7">
              {main_navigation.map((nav) => {
                return (
                  <li key={nav.name} className="py-0.5">
                    <Link
                      className="py-0.5 text-sm text-white dark:text-main-lighter"
                      to={nav.slug}
                    >
                      {nav.name}{" "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* customer service start */}
          <div>
            <h3 className="text-lg font-medium text-white dark:text-main-lighter">
              Customer Service
            </h3>
            <ul className="py-7">
              {customer_care.map((nav) => {
                return (
                  <li key={nav.name} className="py-0.5">
                    <Link
                      className="py-0.5 text-sm text-white dark:text-main-lighter"
                      to={nav.slug}
                    >
                      {nav.name}{" "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white dark:text-main-lighter">
              Secure Payments Methods
            </h3>
            <div className="py-7">
              <div className="pb-1">
                <img
                  className="max-w-[270px]"
                  src={payment_method}
                  alt="payment methods "
                />
              </div>
              <div className="py-1">
                <img
                  className="max-w-[160px]"
                  src={google_play}
                  alt="google play store"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-2 text-center text-white dark:text-main-lighter">
        Copyright © 2024 Priceoye.pk
      </div>
    </footer>
  );
};

export default Footer;
