"use client";

import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProfileNav = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-start px-5 items-center absolute top-0 left-0 h-14 border-b-sypher-light-text border-b">
      <div onClick={() => router.back()}>
        <FaArrowLeft />
      </div>
    </div>
  );
};

export default ProfileNav;
