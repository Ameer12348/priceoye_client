import { Link } from "react-router-dom";

const ProductCard = (product) => {
  return (
    <div className="h-full p-2">
      <Link
        to={`/productdetails/${product.slug}`}
        className="flex h-full flex-col rounded-lg bg-white p-5 dark:bg-main-dark"
      >
        <div className="aspect-square rounded-lg p-0 dark:bg-main-lighter">
          <img
            className="m-0 aspect-square h-full w-full rounded-lg object-contain"
            src={product.thumbnail}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between pt-2">
          <h3 className="text-sm font-semibold dark:text-gray-400">
            {product.title}{" "}
          </h3>
          <div>
            <div className="font-semibold dark:text-main-lighter md:text-lg">
              <sup className="text-[12px]">Rs </sup>
              {product.newPrice}{" "}
            </div>
            {product.lastPrice ? (
              <div className="flex justify-between px-3">
                <div>
                  <del className="text-[9px] text-red-800 dark:text-red-300 md:text-[12px]">
                    <sup>Rs.</sup>
                    {product.lastPrice}
                  </del>
                </div>
                <div className="rounded bg-blue-100 p-1 text-[9px] dark:bg-blue-500 dark:text-lime-200 md:text-[12px]">
                  {Math.round(100 * (1 - product.newPrice / product.lastPrice))}
                  % OFF{" "}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
