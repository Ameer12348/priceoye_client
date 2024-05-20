import React, { useEffect, useRef, useState } from "react";
import { watchbrandfilter } from "../../constants/mobilefilter";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import { proxy } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const CreateWatch = () => {
  const auth = useSelector((x) => x.auth);
  const title = useRef();
  const metaTitle = useRef();
  const slug = useRef();
  const metaDescription = useRef();
  const description = useRef();
  const lastPrice = useRef();
  const newPrice = useRef();
  const stock = useRef();
  const brand = useRef();
  const ram = useRef();
  const storage = useRef();
  const battery = useRef();
  const screenSize = useRef();
  const screenType = useRef();
  const resolution = useRef();
  const protection = useRef();
  const calling = useRef();
  const os = useRef();
  const strapMaterial = useRef();
  const sportsMode = useRef();
  const waterProof = useRef();
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!title.current.value) {
        toast.error("Product Title is Required", {
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
        return title.current.focus();
      }
      if (!metaTitle.current.value) {
        toast.error("Product Meta Title is Required", {
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

        return metaTitle.current.focus();
      }
      if (!slug.current.value) {
        toast.error("Product Slug is Required", {
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

        return slug.current.focus();
      }
      if (!description.current.value) {
        toast.error("Product Description is Required", {
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

        return description.current.focus();
      }
      if (!newPrice.current.value) {
        toast.error("Product newPrice is Required", {
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
        return newPrice.current.focus();
      }
      if (!brand.current.value) {
        toast.error("Product Brand is Required", {
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
        return brand.current.focus();
      }
      if (!thumbnail) {
        toast.error("Thumbnail is Required", {
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
        return "";
      }
      const formData = new FormData();
      // Append form data to FormData object
      formData.append("type", "smartwatch");
      formData.append("title", title.current.value);
      formData.append("metaTitle", metaTitle.current.value);
      formData.append("slug", slug.current.value);
      formData.append("description", description.current.value);
      formData.append("metaDescription", metaDescription.current.value);
      formData.append("lastPrice", lastPrice.current.value || 0);
      formData.append("newPrice", newPrice.current.value);
      formData.append("stock", stock.current.value || 0);
      formData.append("thumbnail", thumbnail);
      formData.append("brand", brand.current.value);

      formData.append(
        "productDetails",
        JSON.stringify({
          ram: ram.current.value || "NA",
          storage: storage.current.value || "NA",
          battery: battery.current.value || "NA",
          screenSize: screenSize.current.value || "NA",
          screenType: screenType.current.value || "NA",
          resolution: resolution.current.value || "NA",
          protection: protection.current.value || "NA",
          calling: calling.current.value || "NA",
          operatingSystem: os.current.value || "NA",
          strapMaterial: strapMaterial.current.value || "NA",
          sportsMode: sportsMode.current.value || "NA",
          waterProof: waterProof.current.value || "NA",
        }),
      );
      const response = await fetch(`${proxy}/createproduct`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${auth.token}`,
        },
      });
      const jsondata = await response.json();
      const data = jsondata;
      if (response.ok) {
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
        navigate("/admin/products");
      }
      if (!response.ok) {
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
  };
  return (
    <div className="min-h-[70vh] dark:bg-main-darker">
      <Helmet>
        <title>Create Product</title>
      </Helmet>

      <div className="mx-auto border xl:container">
        <h1 className="  py-3 text-center text-3xl text-main-darker dark:text-green-400">
          Create Product of Ear Buds
        </h1>
        {/* input fields  */}
        <form
          className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2"
          onSubmit={submitHandler}
        >
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="title"
              placeholder="Title"
              ref={title}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="metaTitle"
              placeholder="Meta Title"
              ref={metaTitle}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="slug"
              placeholder="Slug"
              ref={slug}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="metaDescription"
              placeholder="Meta Description"
              ref={metaDescription}
            />
          </div>
          <div className="col-span-full">
            <textarea
              className=" w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              id="description"
              placeholder="Description"
              ref={description}
            ></textarea>
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="number"
              id="lastprice"
              placeholder="Last Price"
              ref={lastPrice}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="number"
              id="newprice"
              placeholder="New Price"
              ref={newPrice}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="number"
              id="stock"
              placeholder="Stock"
              ref={stock}
            />
          </div>
          <div>
            <select
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              id="brand"
              ref={brand}
            >
              {watchbrandfilter.map((fil) => {
                return (
                  <option value={fil.filter} key={fil.name}>
                    {fil.name}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="ram"
              placeholder="Ram in GB"
              ref={ram}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="storage"
              placeholder="Storage in GB"
              ref={storage}
            />
          </div>

          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="battery"
              placeholder="Battery in Mah"
              ref={battery}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="screenSize"
              placeholder="Screen Size"
              ref={screenSize}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="screentype"
              placeholder="Screen Type"
              ref={screenType}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="resolution"
              placeholder="Resolution"
              ref={resolution}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="protection"
              placeholder="Protection"
              ref={protection}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="calling"
              placeholder="Calling"
              ref={calling}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="os"
              placeholder="Operating System "
              ref={os}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="strap"
              placeholder="Strap Material "
              ref={strapMaterial}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="sports"
              placeholder="Sports Mode"
              ref={sportsMode}
            />
          </div>
          <div>
            <input
              className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
              type="text"
              id="waterproof"
              placeholder="Water Proof"
              ref={waterProof}
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="thumbnail"
              className="block w-full cursor-pointer self-stretch rounded border border-blue-200 p-2 text-center outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  "
            >
              {thumbnail ? thumbnail.name : "Upload Thumbnail"}
              <input
                accept="image/*"
                className="hidden"
                type="file"
                id="thumbnail"
                placeholder="Thumbnail"
                onChange={(e) => {
                  if (e.target.files[0].size > 1 * 1024 * 1024) {
                    return toast.error("image should be less then 1mb", {
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
                  if (e.target.files[0].type.split("/")[0] !== "image") {
                    return toast.error("file type should be an image", {
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
                  setThumbnail(e.target.files[0]);
                }}
              />
            </label>
          </div>
          {thumbnail ? (
            <div className="col-span-full max-h-[300px] max-sm:max-h-[200px]">
              <img
                src={URL.createObjectURL(thumbnail)}
                className="mx-auto block aspect-square h-full  rounded border border-blue-200 object-contain "
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
          <div className="col-span-full">
            <button className="w-full rounded border border-blue-200 p-2 outline-0 placeholder:text-main-dark dark:bg-main-light dark:text-main-darker  ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWatch;
