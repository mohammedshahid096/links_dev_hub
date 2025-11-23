"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UrlInputComponent = ({ info, setInfo, fetchMetadataHandler }) => {
  const handleInputChange = (e) => {
    setInfo({ ...info, inputUrl: e.target.value });
  };
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter URL</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="url"
            placeholder="https://example.com"
            className="w-full"
            onChange={handleInputChange}
          />
          {info?.error && (
            <Alert variant="destructive" className="py-2 mt-2">
              <AlertDescription className="text-sm">
                {info?.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className={"flex justify-end"}>
          <Button
            className="mt-4"
            disabled={info?.metadataLoading}
            onClick={fetchMetadataHandler}
          >
            {info?.metadataLoading && <Loader2 className="animate-spin " />}
            Add Website
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UrlInputComponent;
