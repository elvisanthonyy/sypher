import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ChildProps {
  title: string;
  subTitle: string;
  buttonTitle: string;
  buttonLink?: string;
}

const CompletedComponent = ({
  title,
  subTitle,
  buttonLink,
  buttonTitle,
}: ChildProps) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  return (
    <div
      className={`flex transition-all ease-in duration-900 absolute top-[50%] translate-y-[-50%] gap-6 text-center flex-col w-full items-center`}
    >
      <div
        className={`w-[75px] transition-all ease-in duration-900 ${inView ? "rotate-0 opacity-100" : "-rotate-60 opacity-0"} aspect-square`}
      >
        <Image
          src={"/icons/tick.svg"}
          width={150}
          height={150}
          alt="tck"
          className="w-full"
        />
      </div>
      <div
        className={`flex transition-all ease-in duration-900 ${inView ? "opacity-100" : "opacity-0"} items-center flex-col gap-2`}
      >
        <h1 className="text-[20px] font-semibold">{title}</h1>
        <p className="w-full px-8 text-[14px]">{subTitle}</p>
      </div>
      <Link
        className={`text-white transition-all ease-in duration-900 bg-primary-400 ${inView ? "opacity-100" : "opacity-0"} px-4 py-2 rounded-[32px]`}
        href={`${buttonLink}`}
      >
        <p>{buttonTitle}</p>
      </Link>
    </div>
  );
};

export default CompletedComponent;
