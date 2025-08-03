import { useFormik } from "formik";
import { useContext, useState } from "react";
import { TokenContext } from "../../context/Token.context";
import { CartContext } from "../../context/Cart.context";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function CheckOut() {
  const [payment, setPayment] = useState(null);
  const { token } = useContext(TokenContext);
  const { cartInfo } = useContext(CartContext);
  const navigate = useNavigate();

  async function visaOrder(values) {
    const loadingToast = toast.loading("Loading...");
    try {
      const test = { shippingAddress: values };
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=http://localhost:5173`,
        method: "POST",
        data: { test },
        headers: { token },
      };
      const { data } = await axios.request(options);
      console.log(data);
      location.replace(data.session.url);
      toast.success("Success Make Order");
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function cashOrder(values) {
    const loadingToast = toast.loading("Loading...");
    try {
      const test = { shippingAddress: values };
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        data: test,
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      navigate("/allOrders");
      toast.success("Success Make Order");
    } catch (error) {
      toast.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  const phoneRegex = /^01[0125][0-9]{8}$/;
  const validationSchema = yup.object({
    details: yup.string().required("Details IS Required"),
    phone: yup
      .string("Phone IS Required")
      .required()
      .matches(phoneRegex, "Phone number must be an Egyptian phone number"),
    city: yup.string().required("City IS Required"),
  });
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (payment == "cash") {
        cashOrder();
      } else {
        visaOrder();
      }
    },
  });

  return (
    <>
      <div className="container py-20 space-y-6">
        <h2 className="text-2xl font-medium">Enter The Form</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="details" className="text-xl font-medium">
              Details
            </label>
            <input
              type="text"
              className="form-control"
              id="details"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.details && formik.errors.details && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.details}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="text-xl font-medium">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.phone}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="city" className="text-xl font-medium">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.city}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn mx-2"
            onClick={() => {
              setPayment("cash");
            }}
          >
            Create Cash Order
          </button>
          <button
            type="submit"
            className="btn bg-blue-600 mx-2"
            onClick={() => {
              setPayment("visa");
            }}
          >
            Create Online Payment
          </button>
        </form>
      </div>
    </>
  );
}
