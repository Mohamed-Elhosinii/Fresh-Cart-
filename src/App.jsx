import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GaurdRoute from "./components/GaurdRoute/GaurdRoute";
import TokenProvider from "./context/Token.context";
import CartProvider from "./context/Cart.context";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CheckOut from "./pages/CheckOut/CheckOut";
import Orders from "./pages/Orders/Orders";
import { Offline, Online } from "react-detect-offline";
import OfflineFallback from "./components/Offline/OfflineFallback";
import Products from "./pages/Products/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishList from "./pages/WishList/WishList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element: <Cart /> },
        { path: "/productDetails/:id", element: <ProductDetails /> },
        { path: "/checkOut", element: <CheckOut /> },
        { path: "/allOrders", element: <Orders /> },
        { path: "/products", element: <Products /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "/categoryDetails/:id", element: <CategoryDetails /> },
        { path: "/wishList", element: <WishList /> },
      ],
    },
    { path: "*", element: <NotFound /> },
    {
      path: "",
      element: (
        <GaurdRoute>
          <Layout />
        </GaurdRoute>
      ),
      children: [
        { index: true, element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forgetPassword", element: <ForgetPassword /> },
        { path: "/verifyCode", element: <VerifyCode /> },
        { path: "/resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Online>
          <TokenProvider>
            <CartProvider>
              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
            </CartProvider>
          </TokenProvider>
        </Online>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      <Offline>
        <OfflineFallback />
      </Offline>
    </>
  );
}

export default App;
