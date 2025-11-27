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
      <div className="w-[95%] mx-auto">
        <div className="text-sm text-sypher-light-darkBorder">
          {title && title}
        </div>
        {type === "string" && (
          <div className="w-full h-8 flex pb-3 items-end border-b border-sypher-light-darkBorder  mb-3 mt-3">
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
