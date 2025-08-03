import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../Loading/Loading";
export default function CartItem({ productInfo }) {
  const { cartInfo, removeItemFromCart, updateCount } = useContext(CartContext);
  const { count, price, product } = productInfo;
  const { imageCover, title, id } = product;

  return (
    <>
      {cartInfo ? (
        <>
          <div className="cart-info border-b border-gray-300 py-8 mx-auto lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <img src={imageCover} alt="" className="mx-auto lg:h-96" />
            <div className="space-y-4 py-4 lg:space-y-12">
              <h4 className="text-xl font-medium">{title}</h4>
              <h4 className="text-4xl font-medium">{price}</h4>
              <div className="counter flex justify-around items-center lg:justify-center lg:gap-2 *:text-xl *:font-medium">
                <FontAwesomeIcon
                  onClick={() => {
                    updateCount({ id, count: count + 1 });
                  }}
                  icon={faPlus}
                  className="p-2 border border-mainColor rounded-lg cursor-pointer"
                />
                <span>{count}</span>
                <FontAwesomeIcon
                  onClick={() => {
                    updateCount({ id, count: count - 1 });
                  }}
                  icon={faMinus}
                  className="p-2 border border-mainColor rounded-lg cursor-pointer"
                />
              </div>
              <button
                className="btn text-red-600 hover:bg-red-200 rounded-lg"
                onClick={() => {
                  removeItemFromCart(id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> Remove Item
              </button>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
