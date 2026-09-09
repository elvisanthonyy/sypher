import Image from "next/image";

interface ChildProps {
  icon: string;
  size: number;
}

const ButtonIcon = ({ icon, size }: ChildProps) => {
  return (
    <div className="" style={{ height: size, width: size }}>
      <Image
        src={icon}
        height={1000}
        width={1000}
        alt="icon"
        className="h-full"
        draggable={false}
      />
    </div>
  );
};

export default ButtonIcon;
