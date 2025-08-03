import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/Token.context";
import { CartContext } from "../../context/Cart.context";
export default function Nav() {
  const [mobileMenu, setMobileMenu] = useState("hidden");
  function toggleMobileMenu() {
    if (mobileMenu == "hidden") {
      setMobileMenu("block");
    } else {
      setMobileMenu("hidden");
    }
  }
  const { logOut } = useContext(TokenContext);
  const { cartInfo, getAllCart } = useContext(CartContext);
  useEffect(() => {
    getAllCart();
  }, []);
  return (
    <>
      <nav className="bg-slate-200 fixed top-0 left-0 right-0 z-50">
        <div className="container flex justify-between items-center py-5 px-4">
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
          {localStorage.getItem("token") ? (
            <>
              <ul className="hidden lg:flex justify-center items-center gap-4 *:text-lg">
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"cart"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/wishList"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"products"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"categories"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"brands"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"allOrders"}
                    className={({ isActive }) =>
                      `${isActive ? "font-semibold" : ""}`
                    }
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            </>
          ) : null}
          <ul className="hidden lg:flex justify-center items-center gap-4">
            {localStorage.getItem("token") ? null : (
              <>
                <li>
                  <Link to={"register"} className="text-lg hover:font-medium">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to={"login"} className="text-lg hover:font-medium">
                    Login
                  </Link>
                </li>
              </>
            )}
            {localStorage.getItem("token") ? (
              <>
                <li>
                  <Link className="relative" to={"cart"}>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-gray-700 text-3xl hover:text-gray-800"
                    />
                    <span className="size-6 rounded-full bg-mainColor text-white absolute -top-full -end-1/2 flex justify-center items-center">
                      {cartInfo == null ? (
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                      ) : (
                        cartInfo.numOfCartItems
                      )}{" "}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={logOut}
                    className="text-lg hover:font-medium mx-2"
                  >
                    Log Out
                  </Link>
                </li>
              </>
            ) : null}
          </ul>

          {/* for mobile */}
          <div className="lg:hidden ">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl p-2 bg-white rounded-md cursor-pointer"
              onClick={toggleMobileMenu}
            />
            <div
              className={`${mobileMenu} absolute top-full start-0 end-0 z-50`}
            >
              <ul className="bg-slate-100 space-y-2 py-4 px-4">
                {localStorage.getItem("token") ? (
                  <>
                    <li>
                      <NavLink
                        to={"/home"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"cart"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/wishList"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Wish List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"products"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"categories"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"brands"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"allOrders"}
                        className={({ isActive }) =>
                          `${isActive ? "font-semibold" : ""}`
                        }
                      >
                        Orders
                      </NavLink>
                    </li>
                    <ul>
                      <li className="text-center">
                        <Link to={"cart"} className="relative">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className="text-gray-700 text-3xl hover:text-gray-800"
                          />
                          <span className="size-6 rounded-full bg-mainColor text-white absolute -top-full -end-1/2">
                            {cartInfo == null ? (
                              <FontAwesomeIcon
                                icon={faSpinner}
                                className="fa-spin"
                              />
                            ) : (
                              cartInfo.numOfCartItems
                            )}
                          </span>
                        </Link>
                      </li>
                      <li className="text-center ">
                        <Link
                          onClick={logOut}
                          className="text-lg hover:font-medium"
                        >
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul className="flex justify-center items-center gap-6 *:text-2xl font-medium">
                      <li>
                        <Link
                          to={"register"}
                          className="text-lg hover:font-medium"
                        >
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"login"}
                          className="text-lg hover:font-medium"
                        >
                          Login
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
