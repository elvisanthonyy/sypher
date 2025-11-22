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
    <div>
      <div className="">
        <div className="text-sm">{title && title}</div>
        {type === "string" && (
          <div className="w-full h-10 flex items-end border-b pb-2 my-2">
            {body}
          </div>
        )}
        {type === "number" && (
          <div className="w-full h-10 flex items-end border-b pb-2 my-2">
            {bodyNum}
          </div>
        )}
        {type === "date" && (
          <div className="w-full h-10 flex items-end border-b pb-2 my-2">
            {bodyDate?.toString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileItemComponent;
