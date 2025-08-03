import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router";
import * as yup from "yup";

export default function ForgetPassword() {
  const validationSchema = yup.object({
    email: yup.string().required("email is required").email(),
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function sendData(values) {
    const loadingToast = toast.loading("Loading....");
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("the verify code will send");
      setTimeout(() => {
        navigate("/verifyCode");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Enter Your Own Mail");
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendData,
  });
  return (
    <>
      <div className="w-2/3 mx-auto my-12">
        <h1 className="text-4xl font-semibold py-4">
          Enter Your Email Address:
        </h1>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="email">
            <label htmlFor="email">E-mail :</label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.email}
              </p>
            )}
          </div>
          {error && <p className="text-2xl text-red-400">{error}</p>}
          <div className="flex justify-end">
            <button type="submit" className="btn">
              Send Code
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
