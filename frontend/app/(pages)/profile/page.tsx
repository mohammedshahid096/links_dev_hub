import { UserProfile } from "@clerk/nextjs";
import "@/app/assets/css/profile.css";

const page = () => {
  return (
    <div className="profile-page">
      <UserProfile />
    </div>
  );
};

export default page;
