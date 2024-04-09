"use client";
import Image from "next/image";
import Upload from "../../../../public/images/Upload.png";
import Vectors from "../../../../public/images/Vectors.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { errorNotification, successNotification } from "@/helper/notification";
import { IoMdClose } from "react-icons/io";
import { urlEndPoint } from "@/helper/urlEndpoint";

const Page = ({ params }) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMovieData, setSelectedMovieData] = useState({
    title: "",
    publishing_year: "",
    image: null,
  });
  const { BASE_URL, EDIT_MOVIE, GET_MOVIE_DATA } = urlEndPoint;
  const EDIT_URL = BASE_URL + EDIT_MOVIE + `/${selectedMovieData.id}`;
  const GET_MOVIE_BY_ID_URL = BASE_URL + GET_MOVIE_DATA + `/${params.movieId}`;

  //  ******* select image *******
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFieldValue("image", file);
  };

  // ******* edit Movie validation *******
  const SignUpSchema = Yup.object().shape({
    title: Yup.string().required("Title field is required."),
    publishing_year: Yup.string().required(
      "Publishing year field is required."
    ),
  });

  // ******* edit Movie initial value *******
  const initialFormValues = {
    title: selectedMovieData.title || "",
    publishing_year: selectedMovieData.publishing_year || "",
    image: selectedMovieData.image || null,
  };

  // ******* get movie list *******
  const getMovieById = async () => {
    try {
      const response = await axios.get(GET_MOVIE_BY_ID_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data;",
        },
      });
      setSelectedMovieData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieById();
  }, []);

  // ******* edit movie *******
  const handleEditMovie = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("publishing_year", values.publishing_year);
    typeof values.image === "object" && formData.append("image", values.image);
    try {
      const response = await axios.patch(EDIT_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data;",
        },
      });
      if (response?.data.status === true) {
        successNotification(response?.data.message);
        router.push("/movieList");
      } else {
        errorNotification("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#093545] h-[100vh] relative flex flex-col">
      <Image src={Vectors} className="absolute w-[100%] bottom-0" />
      <div className="px-10 sm:px-28 lg:px-28 xl:px-40  py-5 md:py-7 lg:py-10 xl:py-14 flex  items-center font-semibold text-[#fcebeb] text-3xl md:text-4xl lg:text-5xl text-center">
        <span> Edit </span>
      </div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          handleEditMovie(values);
        }}
        enableReinitialize
      >
        {({ handleSubmit, getFieldProps, setFieldValue, values }) => (
          <div className="grid lg:grid-cols-6  xl:grid-cols-3  px-10 sm:px-28 lg:px-28 xl:px-40   gap-10 lg:gap-32">
            <div className=" lg:col-span-3  xl:col-span-1  min-h-[400px] lg:min-h-[600px]  bg-[#224957]  border-dashed border-[2px] rounded-[10px] text-center flex flex-col justify-center items-center">
              {values.image === null && selectedImage === null && (
                <label
                  htmlFor="imageInput"
                  className={`${
                    selectedImage === null ? "block" : "hidden"
                  } flex flex-col justify-center items-center cursor-pointer `}
                >
                  <Image src={Upload} />
                  <div className="text-[#FFFFFF] mt-2 text-sm cursor-pointer ">
                    Select an image
                  </div>
                </label>
              )}
              <input
                id="imageInput"
                name="image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                  handleImageChange(e, setFieldValue);
                }}
              />
              {values.image && (
                <div className="relative">
                  <IoMdClose
                    size={20}
                    color="white"
                    className="absolute top-1 right-2 cursor-pointer"
                    onClick={() => {
                      setSelectedImage(null);
                      setFieldValue("image", null);
                    }}
                  />
                  <img
                    src={selectedImage || values.image}
                    alt="Selected"
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
            <form
              className="flex flex-col lg:col-span-3 xl:col-span-2 w-[auto]"
              onSubmit={handleSubmit}
            >
              <input
                {...getFieldProps("title")}
                placeholder="Title"
                className="mt-6 text-[#FFFFFF] bg-[#224957] h-[45px] border-none outline-none rounded-[10px] pl-4  text-[14px] w-[100%] sm:w-[60%]"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
              <input
                {...getFieldProps("publishing_year")}
                placeholder="Publishing year"
                className="mt-6 text-[#FFFFFF] bg-[#224957] h-[45px] border-none outline-none rounded-[10px] pl-4  text-[14px] w-[70%] sm:w-[50%]"
              />
              <ErrorMessage
                name="publishing_year"
                component="div"
                className="text-red-500"
              />
              <div className="flex md:mt-8 mb-20 lg:mb-0 lg:mt-14 w-[60%] ">
                <button className="w-[100%] border border-white-300 p-[10px] sm:p-[15px] rounded-[10px]  text-[#FFFFFF] font-bold mt-6 ">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[100%] bg-[#2BD17E] p-[10px] sm:p-[15px] rounded-[10px]  text-[#FFFFFF] font-bold mt-6 ml-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
``;
export default Page;
