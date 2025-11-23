"use client";
import { IUser } from "@/models/user";
import ProfileItemComponent from "./ProfileItemComponent";
import { useRouter } from "next/navigation";

interface ChildProps {
  user: IUser;
}

const ProfileMain = ({ user }: ChildProps) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col h-auto min-h-[60dvh] mt-4 px-5">
      <ProfileItemComponent title="Full Name" type="string" body={user?.name} />
      <ProfileItemComponent
        title="Full Email"
        type="string"
        body={user?.email}
      />
      <ProfileItemComponent title="Gender" type="string" body={user?.gender} />
      <ProfileItemComponent
        title="Address"
        type="string"
        body={user?.address}
      />
      <ProfileItemComponent
        title="Number"
        type="number"
        bodyNum={user?.number}
      />
      <ProfileItemComponent
        title="Date of birth"
        type="date"
        bodyDate={user?.dateOfBirth?.toString().split("T")[0]}
      />
      <button
        onClick={() => router.push(`/profile/${user?.name}/edit`)}
        className="h-13 my-3 rounded-2xl cursor-pointer text-white w-full bg-blue-800"
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileMain;
