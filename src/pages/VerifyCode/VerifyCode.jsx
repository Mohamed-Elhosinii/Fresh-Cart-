import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import * as yup from "yup";
export default function VerifyCode() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function sendData(Values) {
    const loadingToast = toast.loading("Loading...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: Values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Successfull Reset");
      setTimeout(() => {
        navigate("/resetPassword");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  const validationSchema = yup.object({
    resetCode: yup
      .string()
      .required("Code Is Required")
      .matches(/^\d{6}$/, "Incorrect Code"),
  });
  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <div className="w-2/3 mx-auto my-12">
        <h1 className="text-4xl font-semibold py-4">Enter The Code :</h1>
        {error && <p className="text-3xl text-red-400 py-2">{error}</p>}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="code">
            <label htmlFor="resetCode">Code :</label>
            <input
              id="resetCode"
              type="text"
              className="form-control"
              maxLength={6}
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <p className="text-sm bg-red-200 text-red-400 px-2 py-1 rounded-lg">
                {formik.errors.resetCode}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn">
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
