import { getAllWebUrls } from "@/lib/actions/web_url.action";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = async () => {
  const urlsData = await getAllWebUrls();
  return (
    <div className="w-full p-3">
      <Table>
        <TableCaption>A list of your saved URLs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Title</TableHead>
            <TableHead className="w-1/4">URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urlsData?.map((url) => (
            <TableRow key={url?._id}>
              <TableCell className="font-semibold">{url?.title}</TableCell>
              <TableCell>
                <a
                  href={`web_url/edit/${url?._id}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all"
                >
                  {url.url}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
