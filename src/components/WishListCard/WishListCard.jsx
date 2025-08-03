import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";

export default function WishListCard({ itemInfo, removeItem }) {
  const { imageCover, title, price, id } = itemInfo;
  const { AddToCart } = useContext(CartContext);

  return (
    <>
      <div className="border-b border-gray-300 p-8 mx-auto bg-gray-100 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center lg:justify-between">
        <div className="">
          <img src={imageCover} alt="Image" className="mx-auto lg:h-96" />
        </div>
        <div className="py-4 lg:space-y-6">
          <h4 className="text-4xl font-medium">{title}</h4>
          <h4 className="text-2xl font-medium">{price}</h4>
          <button
            onClick={() => {
              removeItem(id);
            }}
            className="btn text-red-600 hover:bg-red-200 rounded-lg"
          >
            <FontAwesomeIcon icon={faTrash} /> Remove Item
          </button>
        </div>
        <div className=" text-center">
          <button
            className="btn bg-white border border-mainColor"
            onClick={() => {
              AddToCart(id);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
