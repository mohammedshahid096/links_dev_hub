"use client";

import { UserProfile, useAuth } from "@clerk/nextjs";
import "@/app/assets/css/profile.css";
import { useEffect } from "react";
import API_URLS from "@/services/config";

const page = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      console.log("Clerk Token:", token);

      if (token) {
        const response = await fetch(`${API_URLS.API_SERVER_BASE_URL}/auth/profile`, {
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
