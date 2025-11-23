"use client";

import React, { useState } from "react";
import UrlInputComponent from "./UrlInputComponent";
import axios from "axios";

const Page = () => {
  const [info, setInfo] = useState({
    metadataLoading: false,
    inputUrl: "",
    error: null,
  });

  const fetchMetadataHandler = async (e) => {
    e?.preventDefault();

    if (!info.inputUrl || info.metadataLoading) return;

    setInfo((prev) => ({ ...prev, metadataLoading: true }));

    try {
      const res = await axios.post("/api/meta-scraper", {
        url: info.inputUrl,
      });

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to fetch metadata");
      }

      const metaResponse = await axios.post("/api/web_url", {
        url: info.inputUrl,
      });
      if (!metaResponse?.data?.success) {
        throw new Error(metaResponse?.data?.message || "Failed to add URL");
      }

      window.location.href = "/admin/web_url";
    } catch (error) {
      console.error("Failed to fetch metadata:", error);
      setInfo((prev) => ({
        ...prev,
        error: error.message || "An error occurred",
      }));
      setTimeout(() => {
        setInfo((prev) => ({ ...prev, error: null }));
      }, 5000);
    } finally {
      setInfo((prev) => ({ ...prev, metadataLoading: false }));
    }
  };

  return (
    <div>
      <UrlInputComponent
        info={info}
        setInfo={setInfo}
        fetchMetadataHandler={fetchMetadataHandler}
      />
    </div>
  );
};

export default Page;
