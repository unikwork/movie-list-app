'use client'
import SignIn from "../app/signIn/page.jsx";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
        <SignIn />
      <ToastContainer/>
    </>
  );
}
