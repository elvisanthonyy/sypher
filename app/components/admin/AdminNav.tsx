import Menu from "../nav/Menu";
import BackButton from "../BackButton";

const AdminNav = () => {
  return (
    <div className="flex fixed top-0 left-0  h-[64px] w-full px-4 justify-between border-b border-border items-center gap-4">
      <BackButton />
      <Menu />
    </div>
  );
};

export default AdminNav;
