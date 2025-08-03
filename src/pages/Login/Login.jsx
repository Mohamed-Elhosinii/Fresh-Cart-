import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { data, Link, useNavigate } from "react-router";
import * as yup from "yup";
import { TokenContext } from "../../context/Token.context";

export default function Login() {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  async function sentData(values) {
    const loadingToast = toast.loading("loading....");
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "Post",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("Success Login");
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sentData,
  });
  return (
    <>
      <div className="w-2/3 mx-auto my-20">
        <h1 className="text-4xl font-semibold py-4">Login Now:</h1>
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
            <label htmlFor="password">Password :</label>
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
          <p>
            <Link to={"/forgetPassword"}>Forget Your Password?</Link>
          </p>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              Login Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
