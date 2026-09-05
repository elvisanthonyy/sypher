import Image from "next/image";

interface ChildProps {
  icon: string;
}

const ButtonIcon = ({ icon }: ChildProps) => {
  return (
    <div className="h-[20px] aspect-square">
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
