import { Route, Routes } from "react-router-dom";
import Navbar from "./features/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./features/Footer/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./app/authSlice";
import Private from "./features/Routes/Private";
import AdminP from "./features/Routes/AdminP";
import Profile from "./features/user/Profile";
import Filter from "./pages/Filter";
import { ToastContainer } from "react-toastify";

import {
  earbudbrandfilter,
  mobileBrandFilter,
  priceSorting,
  searchBrandFilter,
  sorting,
  watchbrandfilter,
} from "./constants/mobilefilter";
import mobile_banner from "./features/media/banners/mobile_banner.jpg";
import tablet_banner from "./features/media/banners/tablet_banner.jpg";
import earbuds_banner from "./features/media/banners/earbuds_banner.jpg";
import watch_banner from "./features/media/banners/watch_banner.jpg";
import Products from "./features/admin/Products";
import Users from "./features/admin/Users";
import Reviews from "./features/admin/Reviews";
import Orders from "./features/admin/Orders";
import CreateMobile from "./features/admin/CreateMobile";
import UpdateMobile from "./features/admin/UpdateMobile";
import CreateWatch from "./features/admin/CreateWatch";
import UpdateWatch from "./features/admin/UpdateWatch";
import UpdateBud from "./features/admin/UpdateBud";
import CreateBud from "./features/admin/CreateBud";
import MobileDetails from "./features/Product/MobileDetails";
import Cart from "./features/cart/Cart";
import BudsDetails from "./features/Product/BudsDetails";
import WatchDetails from "./features/Product/WatchDetails";
import { addItems } from "./app/cartSlice";
import UserOrders from "./features/user/UserOrders";
import Search from "./pages/Search";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const data = localStorage.getItem("auth");
    const data2 = localStorage.getItem("cart");
    if (data) {
      const user = JSON.parse(data);
      dispatch(setAuth(user));
    }
    if (data2) {
      const cart = JSON.parse(data2);
      dispatch(addItems(cart));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/searchproduct/:search"
          element={
            <Search
              sortFilter={sorting}
              brandFilter={searchBrandFilter}
              priceSorting={priceSorting}
              banner={tablet_banner}
              welcomeHeading="Shop and Explore Electronic Products Price in Pakistan 2024"
              welcomeParagraph="Browse lowest price Electronic Products from a variety of brands at the lowest rates online."
              type="tablet"
            />
          }
        />
        <Route
          path="*"
          element={
            <div className="text min-h-[80vh] bg-center py-10 text-center text-xl font-bold">
              Not Found
            </div>
          }
        />

        <Route
          path="/mobiles"
          element={
            <Filter
              sortFilter={sorting}
              brandFilter={mobileBrandFilter}
              priceSorting={priceSorting}
              banner={mobile_banner}
              welcomeHeading="Shop and Explore Mobiles Price in Pakistan 2024              "
              welcomeParagraph="Browse lowest price mobiles from a variety of brands at the lowest rates online."
              type="mobile"
            />
          }
        />
        <Route
          path="/tablets"
          element={
            <Filter
              sortFilter={sorting}
              brandFilter={mobileBrandFilter}
              priceSorting={priceSorting}
              banner={tablet_banner}
              welcomeHeading="Shop and Explore Tablet Price in Pakistan 2024"
              welcomeParagraph="Browse lowest price tablets from a variety of brands at the lowest rates online."
              type="tablet"
            />
          }
        />
        <Route
          path="/smartwatches"
          element={
            <Filter
              sortFilter={sorting}
              brandFilter={watchbrandfilter}
              priceSorting={priceSorting}
              banner={watch_banner}
              welcomeHeading="Shop and Explore Smart Watches Price in Pakistan 2024"
              welcomeParagraph="Browse lowest price smart watches from a variety of brands at the lowest rates online."
              productArray={[]}
              type="smartwatch"
            />
          }
        />
        <Route
          path="/earbuds"
          element={
            <Filter
              sortFilter={sorting}
              brandFilter={earbudbrandfilter}
              priceSorting={priceSorting}
              banner={earbuds_banner}
              welcomeHeading="Shop and Explore Earbuds Price in Pakistan 2024"
              welcomeParagraph="Browse lowest price earbuds from a variety of brands at the lowest rates online."
              productArray={[]}
              type="earbuds"
            />
          }
        />
        <Route path="/user" element={<Private />}>
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
        <Route path="/admin" element={<AdminP />}>
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="orders" element={<Orders />} />
          <Route
            path="createproduct/mobile"
            element={<CreateMobile type="Mobile" />}
          />
          <Route
            path="createproduct/tablet"
            element={<CreateMobile type="Tablet" />}
          />
          <Route
            path="createproduct/smartwatch"
            element={<CreateWatch type="Smartwatch" />}
          />
          <Route path="createproduct/earbuds/" element={<CreateBud />} />
          <Route
            path="updateproduct/tablet/:productSlug"
            element={<UpdateMobile type="Tablet" />}
          />
          <Route
            path="updateproduct/mobile/:productSlug"
            element={<UpdateMobile type="Mobile" />}
          />
          <Route
            path="updateproduct/smartwatch/:productSlug"
            element={<UpdateWatch />}
          />
          <Route
            path="updateproduct/earbuds/:productSlug"
            element={<UpdateBud />}
          />
        </Route>
        <Route
          path="/productdetails/mobile/:slug"
          element={<MobileDetails type="Mobiles" />}
        />
        <Route
          path="/productdetails/tablet/:slug"
          element={<MobileDetails type="Tablets" />}
        />
        <Route path="/productdetails/earbuds/:slug" element={<BudsDetails />} />
        <Route
          path="/productdetails/smartwatch/:slug"
          element={<WatchDetails />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
