import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as yup from "yup";

export default function Login() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = yup.object({
    email: yup.string().required("email is required").email(),
    newPassword: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function sentData(values) {
    const loadingToast = toast.loading("loading....");
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Success Reset Password");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: sentData,
  });
  return (
    <>
      <div className="w-2/3 mx-auto my-12">
        <h1 className="text-4xl font-semibold py-4">Reset Your Password :</h1>
        {error && <p className="text-2xl text-red-400">{error}</p>}
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
          <div className="password">
            <label htmlFor="newPassword">New Password :</label>
            <input
              id="newPassword"
              type="password"
              className="form-control"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
