"use client";
import Image from "next/image";
import Vectors from "../../../public/images/Vectors.png";
import AddMovie from "../../../public/images/AddMovie.png";
import Logout from "../../../public/images/logout.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import EmptyMovieList from "../emptyMovieList/page";
import { urlEndPoint } from "@/helper/urlEndpoint";

const Page = () => {
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const pageSize = 12;
  const totalPges = Math.ceil(movieData.length / pageSize);
  const indexOfLastRecord = page * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = movieData.slice(indexOfFirstRecord, indexOfLastRecord);
  const { BASE_URL, GET_MOVIE_DATA } = urlEndPoint;
  const GET_MOVIE_LIST_URL = BASE_URL + GET_MOVIE_DATA;

  // ******* get movie list *******
  const getMovieData = async () => {
    try {
      const response = await axios.get(
        GET_MOVIE_LIST_URL,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data;",
          },
        }
      );
      setMovieData(response.data.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <>
      <Head></Head>
      {movieData.length === 0 ? (
        <EmptyMovieList />
      ) : (
        <div className="bg-[#093545]  relative flex flex-col min-h-[100vh]">
          <Image src={Vectors} className="absolute w-[100%] bottom-0" />
          <div className="flex flex-col sm:flex-row items-center justify-between w-[100%] px-10 md:px-20 lg:px-28 xl:px-40  py-5 md:py-7 lg:py-10 xl:py-14">
            <div className="flex justify-center items-center font-semibold text-[#fcebeb] text-2xl md:text-4xl lg:text-5xl px-2 md:px-0 text-center">
              <span> My movies </span>
              <a href="/createMovie">
                <Image className="ml-1 sm:ml-3 object-contain" src={AddMovie} />
              </a>
            </div>
            <div className="flex">
              <span className="text-[#FFFFFF] font-bold">Logout</span>
              <a href="/" onClick={() => localStorage.clear()}>
                <Image className="ml-1 sm:ml-3 object-contain" src={Logout} />
              </a>
            </div>
          </div>
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-10 md:px-20 lg:px-28 xl:px-40 overflow-y-auto">
            {currentRecords.map((movie, index) => {
              return (
                <>
                  <Link href="/editMovie/[movieId]" as={`/editMovie/${movie.id}`}>
                  {/* <Link
                    href="/editMovie"
                    onClick={() =>
                      localStorage.setItem("movie", JSON.stringify(movie))
                    }
                  > */}
                    <div className="bg-[#092C39] rounded-xl p-2" key={index}>
                      <img
                        src={movie.image}
                        className="h-[250px] w-[100%] rounded-xl  "
                        alt="movie"
                      />
                      <div className="flex flex-col">
                        <span className="text-[#FFFFFF] font-medium text-xl mt-4 ml-2">
                          {movie.title}
                        </span>
                        <span className="text-[#FFFFFF]  text-sm  ml-2 my-2">
                          {movie.publishing_year}
                        </span>
                      </div>
                    </div>
                  </Link>
                  {/* </Link> */}
                </>
              );
            })}
          </div>
          <div className="mb-20 sm:mb-24 md:mb-32 lg:mb-36 xl:mb-48 flex justify-center items-center">
            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px text-sm">
                <button
                  style={{ marginRight: "10px" }}
                  className="font-bold text-[#FFFFFF]"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
                {new Array(totalPges).fill(1).map((_, i) => {
                  return (
                    <button
                      onClick={() => setPage(i + 1)}
                      style={{ marginLeft: "8px" }}
                      className={`px-3  text-[#FFFFFF] rounded-[4px]  bg-[#092C39] p-2 ${
                        page === i + 1 ? "bg-[#2BD17E]" : "bg-[#092C39]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
                <button
                  style={{ marginLeft: "18px" }}
                  className="font-bold text-[#FFFFFF]"
                  disabled={totalPges === page}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
