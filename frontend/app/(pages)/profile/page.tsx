"use client";

import { UserProfile, useAuth } from "@clerk/nextjs";
import "@/app/assets/css/profile.css";
import { useEffect } from "react";

const page = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Clerk Token:", token);

      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("User Data:", data);
      }
    };
    fetchToken();
  }, [getToken]);

  return (
    <div className="profile-page">
      <UserProfile />
    </div>
  );
};

export default page;
