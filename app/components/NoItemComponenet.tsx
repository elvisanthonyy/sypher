import Link from "next/link";

interface ChildProps {
  title: string;
  subTitle: string;
  buttonText?: string;
  buttonLink?: string;
}

const NoItemComponenet = ({
  title,
  subTitle,
  buttonText,
  buttonLink,
}: ChildProps) => {
  return (
    <div className="text-center w-full absolute top-[50%] left-[50%] translate-[-50%] p-4 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-[18px] tracking-[-2%] font-semibold">{title}</h3>
        <p className="text-text text-[14px]">{subTitle}</p>
      </div>

      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          className="flex items-center text-[14px] bg-primary-400 text-white h-[33px] px-5 rounded-[32px] hover:bg-primary-300"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default NoItemComponenet;
