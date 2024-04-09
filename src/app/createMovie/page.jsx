"use client";
import React, { useState, useId } from "react";
import Image from "next/image";
import Upload from "../../../public/images/Upload.png";
import Vectors from "../../../public/images/Vectors.png";
import { ErrorMessage, Formik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import {  successNotification } from "@/helper/notification";
import { IoMdClose } from "react-icons/io";
import * as Yup from "yup";
import Select, { components } from "react-select";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa";
import i18n from "../../i18n";
import { urlEndPoint } from "@/helper/urlEndpoint";

//dropdown indictor icon
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FaChevronDown />
    </components.DropdownIndicator>
  );
};

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [lngValue, setLngValue] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
  const { BASE_URL, CREATE_MOVIE } = urlEndPoint;
  const CREATE_MOVIE_URL = BASE_URL + CREATE_MOVIE;

  //  ******* language select custom style  *******
  const styles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#093545",
      color: "#fff",
      border: "1px solid #ffffff1e",
      ":hover": {
        border: "1px solid #ffffff1e",
      },
      height: "30px",
      boxShadow: "none",
      transition: "none",
      padding: "0px",
      boederRadius: "20px",
      fontSize: "16px",
      width: "110px",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#224957" : "#2B2B32",
      color: "#FAFAFA",
      zIndex: 1,
      ":hover": {
        backgroundColor: isSelected ? "#6F767E" : "#6F767E",
      },
      borderBottom: "1px solid #ffffff1e",
      transition: "none",
      paddingTop: "5px",
      paddingBottom: "5px",
      fontSize: "16px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 1000,
      backgroundColor: "#2B2B32",
      marginTop: "0px",
      paddingTop: "0px",
      borderTopRightRadius: "0px",
      borderTopLeftRadius: "0px",
      borderBottom: "0px solid #ffffff1e",
      borderLeft: "1px solid #ffffff1e",
      borderRight: "1px solid #ffffff1e",
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#A6A6A6",
    }),
    dropdownIndicator: (defaultStyles, state) => {
      return {
        ...defaultStyles,
        paddingLeft: state.selectProps.menuIsOpen ? "8px" : "0px",
        paddingRight: state.selectProps.menuIsOpen ? "0px" : "8px",
        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      };
    },
  };

  //  ******* select image *******
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFieldValue("image", file);
  };

  // ******* Create Movie validation *******
  const CreateMovieSchema = Yup.object().shape({
    title: Yup.string().required(`${t("titleValidation")}`),
    publishing_year: Yup.string().required(t("yearValidation")),
  });

  // ******* Create Movie initial value *******
  const initialFormValues = {
    title: "",
    publishing_year: "",
    image: null,
  };

  //  ******* Add movie *******
  const handleAddMovie = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("publishing_year", values.publishing_year);
    formData.append("image", values.image);
    try {
      const response = await axios.post(
        CREATE_MOVIE_URL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      if (response?.data.status === true) {
        successNotification(response?.data.message);
        router.push("/movieList");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ******* language array with onChange *******
  const languages = [
    {
      value: "en",
      label: "EN",
    },
    {
      value: "fr",
      label: "FR",
    },
  ];

  const handleChangeLng = (e) => {
    if (i18n) {
      i18n.changeLanguage(e.value);
      setLngValue(e.value);
    }
  };

  const { SingleValue } = components;
  const ValueOption = (props) => (
    <SingleValue {...props} className="flex items-center justify-between">
      <div>{languages.find((item) => item.value === lngValue).label}</div>
      <GrLanguage />
    </SingleValue>
  );

  return (
    <div className="bg-[#093545] h-[100vh] relative flex flex-col">
      <Image src={Vectors} className="absolute w-[100%] bottom-0" />
      <div className="px-10 sm:px-28 lg:px-28 xl:px-40  py-5 md:py-7 lg:py-10 xl:py-14 flex  flex-col sm:flex-row justify-between  items-center font-semibold text-[#fcebeb] text-3xl md:text-4xl lg:text-5xl text-center">
        <span> {t("createMovieTitle")}</span>
        <Select
          className="mt-3 sm:mt-0 "
          required
          id="languageSelect"
          value={languages.find((item) => item.value === lngValue) || ""}
          name="Message"
          placeholder="Select Message"
          onChange={handleChangeLng}
          options={languages}
          styles={styles}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator,
            SingleValue: ValueOption,
          }}
          isSearchable={false}
          instanceId={useId()}
          aria-labelledby="languageSelect"
        />
      </div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={CreateMovieSchema}
        onSubmit={(values) => {
          handleAddMovie(values);
        }}
      >
        {({ handleSubmit, getFieldProps, setFieldValue }) => (
          <div className="grid lg:grid-cols-6  xl:grid-cols-3  px-10 sm:px-28 lg:px-28 xl:px-40   gap-10 lg:gap-32">
            <div className=" lg:col-span-3  xl:col-span-1  min-h-[400px] lg:min-h-[600px]  bg-[#224957]  border-dashed border-[2px] rounded-[10px] text-center flex flex-col justify-center items-center">
              <label
                htmlFor="imageInput"
                className={`${
                  selectedImage === null ? "block" : "hidden"
                } flex flex-col justify-center items-center cursor-pointer `}
              >
                <Image src={Upload} />
                <span className="text-[#FFFFFF] mt-2 text-sm ">
                  {t("selectImage")}
                </span>
              </label>
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
              {selectedImage && (
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
                    src={selectedImage}
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
                placeholder={t("Title")}
                className="mt-6 text-[#FFFFFF] bg-[#224957] h-[45px] border-none outline-none rounded-[10px] pl-4  text-[14px] w-[100%] sm:w-[60%]"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
              <input
                {...getFieldProps("publishing_year")}
                placeholder={t("Publishing year")}
                className="mt-6 text-[#FFFFFF] bg-[#224957] h-[45px] border-none outline-none rounded-[10px] pl-4  text-[14px] w-[70%] sm:w-[50%]"
              />
              <ErrorMessage
                name="publishing_year"
                component="div"
                className="text-red-500"
              />
              <div className="flex md:mt-8 mb-20 lg:mb-0 lg:mt-14 w-[60%] ">
                <button className="w-[100%] border border-white-300 p-[10px] sm:p-[15px] rounded-[10px]  text-[#FFFFFF] font-bold mt-6 ">
                  {t("Cancel")}
                </button>
                <button
                  type=""
                  className="w-[100%] bg-[#2BD17E] p-[10px] sm:p-[15px] rounded-[10px]  text-[#FFFFFF] font-bold mt-6 ml-4"
                >
                  {t("Submit")}
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default Page;
