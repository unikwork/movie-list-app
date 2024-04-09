import Image from "next/image";
import Link from "next/link";
import Vectors from "../../../public/images/Vectors.png";

const Page = () => {
  return (
    <div className="bg-[#093545] h-[100vh] relative flex flex-col justify-center items-center">
      <Image src={Vectors} className="absolute w-[100%] bottom-0" />
      <span className="font-[600] text-[#fcebeb] text-[32px] md:text-[38px] lg:text-5xl px-2 md:px-[0] pb-7 text-center">
        Your movie list is empty
      </span>
      <Link href="/createMovie">
        <button className="w-[100%] bg-[#2BD17E] p-[10px] sm:py-[15px]  px-[15px] sm:px-[25px] rounded-10  text-[#FFFFFF] font-bold  ">
          Add a new movie
        </button>
      </Link>
    </div>
  );
};
export default Page;
