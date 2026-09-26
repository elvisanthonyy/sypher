import Menu from "../nav/Menu";
import BackButton from "../BackButton";
import ButtonIcon from "./ButtonIcon";
import Link from "next/link";

interface ChildProps {
  reservationNumber?: number;
  pageName?: string;
}

const AdminNav = ({ reservationNumber, pageName }: ChildProps) => {
  return (
    <div className="flex z-30 lg:px-[128px] fixed top-0 left-0 h-[64px] w-full px-4 bg-white justify-between border-b border-border items-center gap-4">
      <BackButton />
      {pageName !== "Reservations" && (
        <Link
          href={"/"}
          className="transition-all hidden lg:flex duration-500 ease-in px-4 py-1 rounded-[32px] hover:bg-[rgb(255, 204, 194)] hover:text-text px-4 shrink-0 gap-6 flex items-center"
        >
          Home
        </Link>
      )}
      {pageName === "Reservations" && (
        <div className="flex gap-2">
          <div className="text-[16px] font-semibold">Orders</div>
          <div className="text-[12px] flex h-[24px] aspect-square items-center justify-center bg-primary-400 text-white rounded-full">
            {reservationNumber}
          </div>
        </div>
      )}

      <Link href={"/user/admin"}>
        <div className="flex items-center gap-2">
          <h6 className="text-text text-[16px] font-semibold">Admin</h6>

          <ButtonIcon icon="/icons/admin-icon.svg" size={24} />
        </div>
      </Link>
      {pageName !== "Orders" && <Menu />}
    </div>
  );
};

export default AdminNav;
