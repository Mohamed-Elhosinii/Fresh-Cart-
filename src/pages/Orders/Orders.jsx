import { useContext, useEffect, useState } from "react";
import CardOrder from "./../../components/CardOrder/CardOrder";
import axios from "axios";
import { TokenContext } from "../../context/Token.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";

export default function Orders() {
  const { token } = useContext(TokenContext);
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState(null);

  async function getAllOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setOrders(data);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {orders ? (
        orders.length === 0 ? (
          <h2 className="text-center py-6 rounded-lg text-2xl bg-red-500 text-white">
            You have no orders yet.
          </h2>
        ) : (
          orders.map((order) => (
            <div key={order.id}>
              <div className="container py-4 my-4">
                <div className="one-order space-y-6 border-2 border-gray-400 p-6 my-4">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-medium flex gap-1">
                      <h3>Order ID</h3>
                      <h3>#{order.id}</h3>
                    </div>
                    <div>
                      <button
                        className={`btn mx-2 text-white ${
                          order.isDelivered
                            ? "bg-mainColor"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Under Delivered"}
                      </button>
                      <button
                        className={`btn mx-2 text-white ${
                          order.isPaid ? "bg-mainColor" : "bg-red-600"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {order.cartItems.map((product) => (
                      <CardOrder
                        key={product.product.id}
                        productInfo={product}
                      />
                    ))}
                  </div>
                  <h3 className="text-xl font-medium text-center">
                    Total Cart Price : <span>{order.totalOrderPrice}</span>
                  </h3>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
