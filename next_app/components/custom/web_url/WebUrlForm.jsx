"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getChangedValues } from "@/helpers";

const WebUrlForm = ({ info }) => {
  // Validation schema
  const validateSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters"),
    slug: Yup.string()
      .required("Slug is required")
      .matches(
        /^[a-z0-9-]+$/,
        "Slug must contain only lowercase letters, numbers, and hyphens"
      ),
    url: Yup.string().required("URL is required").url("Must be a valid URL"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    isActive: Yup.boolean(),
    planType: Yup.string().oneOf(
      ["free", "paid", "freemium"],
      "Must be free, paid, or freemium"
    ),
    sourceType: Yup.string().required("Type is required"),
    keywords: Yup.array()
      .of(Yup.string())
      .min(1, "At least one keyword is required"),
    githubUrl: Yup.string().nullable().url("Must be a valid GitHub URL"),
    author: Yup.string().required("Author is required"),
    image: Yup.string().nullable().url("Must be a valid image URL"),
    icon: Yup.string().nullable().url("Must be a valid icon URL"),
    github: Yup.object().shape({
      stars: Yup.number()
        .nullable()
        .min(0, "Stars cannot be negative")
        .typeError("Stars must be a number"),
      url: Yup.string().nullable().url("Must be a valid GitHub URL"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      title: info?.title || "",
      slug: info?.slug || "",
      url: info?.url || "",
      description: info?.description || "",
      isActive: info?.isActive || false,
      planType: info?.planType || "free",
      sourceType: info?.sourceType || "",
      keywords: info?.keywords || [],
      github: {
        stars: info?.github?.stars || null,
        url: info?.github?.url || null,
      },
      urlImage: info?.urlImage || "",
      urlIcon: info?.urlIcon || "",
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: (values) => {
      const json = getChangedValues(info, values);
      console.log(json, "shahid --");
    },
  });

  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    setFieldValue,
  } = formik;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {info?._id ? info?.title : "Add New Resource"}
          </CardTitle>
          <CardDescription>
            Fill out the form below to {info?._id ? "update" : "create"} a Magic
            UI resource entry.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={values?.title || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter title"
                    className={
                      errors?.title && touched?.title
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors?.title && touched?.title && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.title}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={values?.slug || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="enter-slug-here"
                    className={
                      errors?.slug && touched?.slug ? "border-destructive" : ""
                    }
                    readOnly={true}
                  />
                  {errors?.slug && touched?.slug && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.slug}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  value={values?.url || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://example.com"
                  className={
                    errors?.url && touched?.url ? "border-destructive" : ""
                  }
                  readOnly={true}
                />
                {errors?.url && touched?.url && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.url}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={values?.description || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  placeholder="Enter description"
                  className={
                    errors?.description && touched?.description
                      ? "border-destructive"
                      : ""
                  }
                />
                {errors?.description && touched?.description && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors?.description}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Status Configuration Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuration</h3>
              <Separator />

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={values?.isActive || false}
                    onCheckedChange={(checked) =>
                      setFieldValue("isActive", checked)
                    }
                  />
                  <Label htmlFor="isActive" className="text-sm font-normal">
                    Active
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="planType">Pricing *</Label>
                  <Select
                    value={values?.planType || "free"}
                    onValueChange={(value) => setFieldValue("planType", value)}
                    className="w-full"
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors?.planType && touched?.planType && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.planType}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <Label htmlFor="planType">Website Type *</Label>
                  <Select
                    value={values?.sourceType || "website"}
                    onValueChange={(value) =>
                      setFieldValue("sourceType", value)
                    }
                    className="w-full"
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="npm">NPM</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors?.sourceType && touched?.sourceType && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.sourceType}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Keywords Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Keywords</h3>
              <Separator />

              <div className="space-y-2">
                <Label htmlFor="keywords">
                  Keywords * (Press Enter or comma to add)
                </Label>
                <Input
                  id="keywords"
                  placeholder="Type keyword and press Enter"
                  //   onKeyDown={handleKeywordsChange}
                  className={
                    errors?.keywords && touched?.keywords
                      ? "border-destructive"
                      : ""
                  }
                />
                {errors?.keywords && touched?.keywords && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors?.keywords}
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {values?.keywords?.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {keyword}
                      <button
                        type="button"
                        // onClick={() => removeKeyword(index)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Github Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Github Information</h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github.url">GitHub URL</Label>
                  <Input
                    id="github.url"
                    name="github.url"
                    type="url"
                    value={values?.github?.url || ""}
                    onChange={(e) => {
                      setFieldValue("github.url", e.target.value);
                    }}
                    onBlur={handleBlur}
                    placeholder="https://github.com/username/repo"
                    className={
                      errors?.github?.url && touched?.github?.url
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors?.github?.url && touched?.github?.url && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.github?.url}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github.stars">GitHub Stars</Label>
                  <Input
                    id="github.stars"
                    name="github.stars"
                    type="number"
                    value={values?.github?.stars || "0"}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFieldValue(
                        "github.stars",
                        val === "" ? null : parseInt(val, 10)
                      );
                    }}
                    onBlur={handleBlur}
                    placeholder="0"
                    className={
                      errors?.github?.stars && touched?.github?.stars
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors?.github?.stars && touched?.github?.stars && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.github?.stars}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={values?.urlImage || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://example.com/image.jpg"
                    className={
                      errors?.urlImage && touched?.urlImage
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors?.urlImage && touched?.urlImage && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.urlImage}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon URL</Label>
                  <Input
                    id="icon"
                    name="icon"
                    type="url"
                    value={values?.urlIcon || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="https://example.com/favicon.ico"
                    className={
                      errors?.urlIcon && touched?.urlIcon
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {errors?.urlIcon && touched?.urlIcon && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors?.urlIcon}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            {info?._id ? (
              <div className="flex justify-end space-x-4 pt-6">
                <Button type="submit">Update</Button>
              </div>
            ) : (
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => resetForm()}
                >
                  Reset
                </Button>
                <Button type="submit">Create</Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebUrlForm;
