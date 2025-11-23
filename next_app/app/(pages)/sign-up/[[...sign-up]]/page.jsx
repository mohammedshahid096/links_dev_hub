import { SignUp } from "@clerk/nextjs";
import "@/app/assets/css/page.css";

export default function Page() {
  return (
    <div className="page">
      <div className="middleScreen">
        <SignUp />
      </div>
    </div>
  );
}
