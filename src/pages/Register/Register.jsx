import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as yup from "yup";

export default function Register() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name must be more than 3 characters")
      .max(20, "name must be less than 20 characters"),
    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: yup
      .string()
      .required("Re-enter your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(phoneRegex, "Phone number must be an Egyptian phone number"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: sendData,
  });

  async function sendData(values) {
    const loadingToast = toast.loading("Loading.....");
    setLoading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Register Is Success");
      console.log(data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  }
  return (
    <>
      <div className="w-2/3 mx-auto my-12">
        <h1 className="text-4xl font-semibold py-4">Register Now:</h1>
        {error && <p className="text-2xl text-red-400">{error}</p>}

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">E-mail</label>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="repassword">
            <label htmlFor="repassword">Re-Password</label>
            <input
              id="repassword"
              type="password"
              className="form-control"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.rePassword}
              </p>
            )}
          </div>
          <div className="phone">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              className="form-control"
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
          <div className="flex justify-end">
            <button
              type="submit"
              className={`btn ${loading ? "hidden" : ""}`}
              disabl
              ed={loading}
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
