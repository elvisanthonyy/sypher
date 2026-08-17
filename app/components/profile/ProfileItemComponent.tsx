import Image from "next/image";
interface ChildProps {
  title: string;
  body?: string;
  bodyNum?: string;
  bodyDate?: string;
  type: string;
  iconUrl?: string;
}

const ProfileItemComponent = ({
  title,
  body,
  bodyNum,
  bodyDate,
  type,
  iconUrl,
}: ChildProps) => {
  return (
    <div className="bg-background px-4 gap-4 rounded-[16px] text-text font-medium text-[14px] font-medium flex items-center h-12.5 flex">
      <div className="w-5 aspect-square">
        <Image
          src={iconUrl}
          alt="Profile"
          width={40}
          height={40}
          className="w-full h-full"
        />
      </div>
      <div className="w-full">
        {type === "string" && <div className="">{body}</div>}
        {type === "string" && <div className="">{bodyNum}</div>}
        {type === "date" && (
          <div className="">{bodyDate ? bodyDate?.toString() : title}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileItemComponent;
