"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-7 aspect-square" onClick={() => router.back()}>
        <Image
          src="/icons/back-icon.svg"
          width={1000}
          height={1000}
          alt="Back"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default BackButton;
