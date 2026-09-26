import Image from "next/image";
interface ChildProps {
  details?: string;
  iconUrl?: string;
  bodyDate?: string;
  type: string;
  title: string;
}

const ProfileItemComponent = ({
  details,
  bodyDate,
  iconUrl,
  type,
  title,
}: ChildProps) => {
  const userDOB = bodyDate ? bodyDate : "";
  const makeDate = new Date(userDOB);
  const formartedDate = makeDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="bg-background px-4 gap-4 rounded-[16px] text-text text-[14px] font-semibold flex items-center h-12.5 flex">
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
        {type !== "date" && <div className="">{details ? details : title}</div>}

        {type === "date" && (
          <div className="">{bodyDate ? formartedDate : title}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileItemComponent;
