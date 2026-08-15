interface ChildProps {
  title: string;
  body?: string;
  bodyNum?: number;
  bodyDate?: string;
  type: string;
}

const ProfileItemComponent = ({
  title,
  body,
  bodyNum,
  bodyDate,
  type,
}: ChildProps) => {
  return (
    <div className="bg-background px-4 rounded-[16px] text-text text-[14px] font-medium flex items-center h-12.5 flex">
      <div className="w-full">
        {type === "string" && <div className="">{body}</div>}
        {type === "number" && <div className="">{bodyNum}</div>}
        {type === "date" && (
          <div className="">{bodyDate ? bodyDate?.toString() : title}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileItemComponent;
