import { useContext, useEffect, useState } from "react";
import WishListCard from "../../components/WishListCard/WishListCard";
import { TokenContext } from "../../context/Token.context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function WishList() {
  const { token } = useContext(TokenContext);
  const [wishList, setWishList] = useState([]);
  async function getWishList() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/wishlist",
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    setWishList(data.data);
  }
  useEffect(() => {
    getWishList();
  }, []);

  async function removeItem(id) {
    const loadingToast = toast.loading("Loading...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);
      console.log(data);

      const { message } = data;
      toast.success(message);
      getWishList();
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <>
      {wishList ? (
        <>
          <div className="container">
            <h2 className="text-5xl font-semibold text-center py-8">
              My Wish List
            </h2>
            {wishList.length == 0 ? (
              <h2 className="text-2xl font-medium text-center py-12 text-red-600">
                Your Wish List Is Epmty Go TO
                <Link className="underline text-blue-600 mx-2" to={"/"}>
                  Add Items
                </Link>
              </h2>
            ) : (
              wishList.map((item) => (
                <WishListCard
                  key={item.id}
                  itemInfo={item}
                  removeItem={removeItem}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
