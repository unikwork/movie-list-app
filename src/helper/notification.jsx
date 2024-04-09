'use client'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
  autoClose: 2500,
  position: "top-right",
  theme: "light",
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
};

export const successNotification = (message) =>
  toast.success(message, toastStyle);
export const errorNotification = (message) => toast.error(message, toastStyle);
export const warningNotification = (message) =>
  toast.warning(message, toastStyle);
