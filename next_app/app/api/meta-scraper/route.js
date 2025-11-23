import { NextResponse } from "next/server";
import getMetaData from "metadata-scraper";

export async function POST(request) {
  try {
    const payload = await request.json();

    const metadata = await getMetaData(payload?.url);

    return NextResponse.json({
      success: true,
      statusCode: 200,
      message: "successfully fetched metadata",
      data: metadata,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json({
      success: false,
      statusCode: 200,
      message: error?.message || "Failed to fetch metadata",
      data: error,
    });
  }
}
