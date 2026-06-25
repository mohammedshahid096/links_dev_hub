"use client";

import { UserProfile, useAuth } from "@clerk/nextjs";
import "@/app/assets/css/profile.css";
import { useEffect } from "react";
import API_URLS from "@/services/config";
import { Header } from "@/components/layout/header";

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
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <Header />
      <main className="flex justify-center py-12 px-4">
        <div className="profile-page">
          <UserProfile />
        </div>
      </main>
    </div>
  );
};

export default page;

