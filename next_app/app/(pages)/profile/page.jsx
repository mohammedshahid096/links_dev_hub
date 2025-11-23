import { UserProfile } from "@clerk/nextjs";
import "@/app/assets/css/page.css";
import "@/app/assets/css/profile.css";

const page = () => {
  return (
    <div className="page profile-page ">
      <UserProfile />
    </div>
  );
};

export default page;
