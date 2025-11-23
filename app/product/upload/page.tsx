import ProductUploadMain from "@/app/components/productUpload/ProductUploadMain";
import ProfileNav from "@/app/components/profile/ProfileNav";

const page = () => {
  return (
    <div className="w-full h-dvh pt-25">
      <ProfileNav />
      <ProductUploadMain />
    </div>
  );
};

export default page;
