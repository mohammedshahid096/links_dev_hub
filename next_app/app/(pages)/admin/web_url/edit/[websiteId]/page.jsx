import React from "react";
import { getWebUrlById } from "@/lib/actions/web_url.action";
import WebUrlForm from "@/components/custom/web_url/WebUrlForm";

const page = async ({ params }) => {
  const { websiteId } = params;
  let data = await getWebUrlById(websiteId);
  data = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <WebUrlForm info={data} />
    </div>
  );
};

export default page;
