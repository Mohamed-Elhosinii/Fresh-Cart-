import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router";
import axios from "axios";

export default function card({ productInfo }) {
  const { id, imageCover, title, price, ratingsQuantity, description } =
    productInfo;
  const { AddToCart, token } = useContext(CartContext);
  const [heart, setHeart] = useState(false);

  async function addToWishList() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "POST",
      data: {
        productId: id,
      },
      headers: { token },
    };
    const { data } = await axios.request(options);
    if (data.status == "success") {
      setHeart(true);
    }
  }

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg overflow-hidden">
      <Link to={`/productDetails/${id}`}>
        <img src={imageCover} alt="product Image" className="object-fill" />
      </Link>
      <div className="p-2 space-y-4">
        <h2 className="text-2xl font-semibold line-clamp-1">{title}</h2>
        <h3 className="text-lg font-normal line-clamp-1">{description}</h3>
        <div className="flex justify-between items-center text-lg font-medium">
          <span>{price} EG</span>
          <span>
            {ratingsQuantity}
            <FontAwesomeIcon icon={faStar} className="text-amber-300 mx-1" />
          </span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => {
              AddToCart(id);
            }}
            className="btn grow bg-mainColor/80 text-white border-0 hover:bg-mainColor text-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mx-2" />
            Add
          </button>
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-4xl cursor-pointer ${heart ? "text-red-500" : ""}`}
            onClick={() => {
              addToWishList();
            }}
          />
        </div>
      </div>
    </div>
  );
}
