import open_parcel from "../media/images/open_parcel.svg";
import easy_instalment from "../media/images/easy_instalment.svg";
import price_match from "../media/images/price_match.svg";
import order_packaging from "../media/images/order-packaging.svg";

const ReasonBuy = () => {
  return (
    <div className="mx-auto mt-2 px-3   py-10 2xl:container">
      <div className=" flex justify-between  px-3 py-10 ">
        <h2 className="text-lg font-medium dark:text-white">Reason to Buy</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* card  */}
        <div className="flex flex-col items-center rounded-xl bg-main-dark p-8 max-md:gap-3 md:flex-row md:justify-around">
          {/* img div  */}
          <div className="  dropshadowimgs aspect-square w-40">
            <img
              className="h-full w-full"
              src={open_parcel}
              alt="open_parcel"
            />
          </div>
          <div className="flex flex-col justify-center  gap-3">
            <h3 className="text-center text-2xl font-medium text-white">
              Open Parcel <br /> (ISB - LHR - KHI)
            </h3>
            <div className="flex justify-center">
              <button className=" rounded bg-orange-400 px-3 py-1.5 font-medium text-white">
                Know More
              </button>
            </div>
          </div>
        </div>
        {/* card  */}
        <div className="flex flex-col items-center rounded-xl bg-main-dark p-8 max-md:gap-3 md:flex-row md:justify-around">
          {/* img div  */}
          <div className="  dropshadowimgs aspect-square w-40">
            <img
              className="h-full w-full"
              src={easy_instalment}
              alt="easy_installment"
            />
          </div>
          <div className="flex flex-col justify-center  gap-3">
            <h3 className="text-center text-2xl font-medium text-white">
              Easy <br /> Installments{" "}
            </h3>
            <div className="flex justify-center">
              <button className=" rounded bg-orange-400 px-3 py-1.5 font-medium text-white">
                Know More
              </button>
            </div>
          </div>
        </div>
        {/* card  */}
        <div className="flex flex-col items-center rounded-xl bg-main-dark p-8 max-md:gap-3 md:flex-row md:justify-around">
          {/* img div  */}
          <div className="  dropshadowimgs aspect-square w-40">
            <img className="h-full w-full" src={price_match} alt="coins" />
          </div>
          <div className="flex flex-col justify-center  gap-3">
            <h3 className="text-center text-2xl font-medium text-white">
              Price Match <br /> Policy{" "}
            </h3>
            <div className="flex justify-center">
              <button className=" rounded bg-orange-400 px-3 py-1.5 font-medium text-white">
                Know More
              </button>
            </div>
          </div>
        </div>
        {/* card  */}
        <div className="flex flex-col items-center rounded-xl bg-main-dark p-8 max-md:gap-3 md:flex-row md:justify-around">
          {/* img div  */}
          <div className="  dropshadowimgs aspect-square w-40">
            <img
              className="h-full w-full"
              src={order_packaging}
              alt="video packaging"
            />
          </div>
          <div className="flex flex-col justify-center  gap-3">
            <h3 className="text-center text-2xl font-medium text-white">
              Packaging <br /> Video
            </h3>
            <div className="flex justify-center">
              <button className=" rounded bg-orange-400 px-3 py-1.5 font-medium text-white">
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonBuy;
