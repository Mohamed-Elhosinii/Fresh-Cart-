import { useContext, useEffect } from "react";
import { CartContext } from "./../../context/Cart.context";
import CartItem from "./../../components/CartItem/CartItem";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router";
import Card from "./../../components/Card/Card";

export default function Cart() {
  const { getAllCart, cartInfo, clearCart } = useContext(CartContext);
  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
      <div className="container bg-slate-100 text-center px-6 py-6 my-16">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-3xl font-semibold">Cart Shop</h2>
          <Link
            to={"/checkOut"}
            className="btn text-white bg-blue-600 hover:bg-blue-700"
          >
            Check out
          </Link>
        </div>
        {cartInfo ? (
          <>
            <div className="flex justify-around items-center py-6">
              <h3 className="text-2xl font-medium">
                Total Price :
                <span className="text-mainColor mx-2">
                  {cartInfo.data.totalCartPrice
                    ? cartInfo.data.totalCartPrice
                    : "0"}
                </span>
              </h3>
              <h3 className="text-2xl font-medium">
                Num. Of Items :
                <span className="text-mainColor mx-2">
                  {cartInfo.numOfCartItems}
                </span>
              </h3>
            </div>
            {cartInfo.numOfCartItems == "0" ? (
              <>
                <h2 className="text-2xl font-medium text-center py-12 text-red-600">
                  Your Cart Is Epmty Go TO
                  <Link className="underline text-blue-600 mx-2" to={"/"}>
                    Add Items
                  </Link>
                </h2>
              </>
            ) : (
              <>
                {cartInfo.data.products.map((product) => (
                  <CartItem productInfo={product} key={product._id} />
                ))}
                <button
                  className="btn bg-transparent border border-mainColor my-8"
                  onClick={clearCart}
                >
                  Clear Your Cart
                </button>
              </>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
