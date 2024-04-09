"use client";
import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ErrorMessage, Formik } from "formik";
import { urlEndPoint } from "@/helper/urlEndpoint";
import Vectors from "../../../public/images/Vectors.png";
import { errorNotification, successNotification } from "@/helper/notification";

const Page = () => {
  const router = useRouter();
  const { BASE_URL, LOGIN } = urlEndPoint;
  const LOGIN_URL = BASE_URL + LOGIN;

  // ******* login validation *******
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email field is required."),
    password: Yup.string().required("Password should not be blank."),
  });

  // ******* login initial value *******
  const initialFormValues = {
    email: "",
    password: "",
  };

  // ******* login post data *******
  const handleLogin = async (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      const response = await axios.post(LOGIN_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data.status === true) {
        localStorage.setItem("token", response.data.data.token);
        successNotification(response?.data.message);
        router.push("/movieList");
      }
    } catch (error) {
      errorNotification(error.response?.data.message);
    }
  };

  return (
    <div className="bg-[#093545] h-[100vh] relative flex justify-center items-center">
      <Image src={Vectors} className="absolute w-[100%] bottom-0" />
      <div className="flex flex-col px-10 sm:px-0 min-w-[250px] sm:min-w-[320px]  text-center">
        <span className="font-semibold text-[#fcebeb] text-[44px] md:text-[54px] lg:text-[64px] pb-5 md:pb-7 ">
          Sign in
        </span>
        <Formik
          initialValues={initialFormValues}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ handleSubmit, getFieldProps }) => (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                {...getFieldProps("email")}
                placeholder="Email"
                className="text-[#FFFFFF] bg-[#224957] h-[45px] border-none outline-none rounded-[10px] pl-4 text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <input
                {...getFieldProps("password")}
                placeholder="Password"
                type="password"
                className="mt-6 text-[#FFFFFF] bg-[#224957] h-[45px] border-none outline-none rounded-[10px] pl-4 text-sm"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              <div className="flex justify-center items-center mt-3 md:mt-6">
                <input
                  type="checkbox"
                  id="vehicle1"
                  className="bg-[#224957] h-14 w-[17px]"
                />
                <span className="text-[#FFFFFF] pl-2 text-sm font-extralight">
                  Remember me
                </span>
              </div>
              <button
                type="submit"
                className="w-[100%] bg-[#2BD17E] p-[10px] sm:p-[15px] rounded-[10px] text-[#FFFFFF] font-bold mt-3 md:mt-6"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Page;
