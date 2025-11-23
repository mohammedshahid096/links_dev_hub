import { addNewWebUrl, getWebUrlByKeyPair } from "@/lib/actions/web_url.action";
import { addNewWebUrlSchema } from "@/lib/validators/web_url.validation";
import { NextResponse } from "next/server";
import getMetaData from "metadata-scraper";
import connectDB from "@/lib/config/mongodb.config";
import { getCurrentUser } from "@/lib/helpers/user.helper";
import { converToJson } from "@/helpers";
import slugify from "slugify";

export async function GET(request) {
  try {
    const slug = "magicuidesign";
    await connectDB();
    const details = await getWebUrlByKeyPair("slug", slug);
    if (!details) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 404,
          message: "URL not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "URL details fetched successfully",
      data: details,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { url } = payload;
    await connectDB();
    const adminUser = await getCurrentUser();

    if (!adminUser) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "Unauthorized user",
        },
        { status: 401 }
      );
    }

    let slug = url.replace(/https?:\/\//, "");
    slug = slugify(slug, { lower: true, strict: true });

    const existingUrl = await getWebUrlByKeyPair("slug", slug);
    if (existingUrl) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 409,
          message: "URL already exists",
        },
        { status: 409 }
      );
    }
    const metadata = await getMetaData(url);
    const details = {
      scrappedData: converToJson(metadata),
      title: metadata?.title || "",
      slug: slug,
      url: metadata?.url || url,
      description: metadata?.description || "",
      isActive: true,
      sourceType: metadata?.type || "website",
      keywords: metadata?.keywords || [],
      planType: "free",
      urlImage: metadata?.image || "",
      urlIcon: metadata?.icon || "",
    };

    const result = await addNewWebUrl(details);
    if (result instanceof Error) {
      console.error("Error saving metadata:", result.message);
      return NextResponse.json(
        {
          success: false,
          statusCode: 500,
          message: "Failed to save metadata",
          error: result.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      statusCode: 201,
      message: "successfully added metadata",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json({
      success: false,
      statusCode: 200,
      message: error?.message || "Failed to add metadata",
      data: error,
    });
  }
}
