import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Token.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(TokenContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function AddToCart(productId) {
    const loadingToast = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        data: { productId },
        headers: { token },
      };
      const { data } = await axios.request(options);
      const { message } = data;
      toast.success(message);
      getAllCart();
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function getAllCart() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/cart",
      method: "GET",
      headers: { token },
    };
    const { data } = await axios.request(options);
    setCartInfo(data);
  }
  async function removeItemFromCart(id) {
    const loadingToast = toast.loading("Loading...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);
      setCartInfo(data);
      toast.success("Success Remove Item");
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function clearCart() {
    const loadingToast = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: { token },
      };
      const { data } = await axios.request(options);
      getAllCart();
      toast.success("Success Clear Cart");
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function updateCount({ id, count }) {
    const loadingToast = toast.loading("Loading...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        data: { count },
        headers: { token },
      };
      const { data } = await axios.request(options);
      setCartInfo(data);
      toast.success("");
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <CartContext.Provider
      value={{
        AddToCart,
        getAllCart,
        cartInfo,
        removeItemFromCart,
        clearCart,
        updateCount,
        token,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
