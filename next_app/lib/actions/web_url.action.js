"use server";

import { converToJson, sanitizeForClient } from "@/helpers";
import connectDB from "../config/mongodb.config";
import urlModel from "@/models/url.model";

export const addNewWebUrl = async (webDetails) => {
  try {
    await connectDB();
    const details = new urlModel(webDetails);
    await details.save();
    return converToJson(details);
  } catch (error) {
    console.log("error at addNewWebUrl", error);
    return error;
  }
};

export const getWebUrlById = async (id) => {
  try {
    await connectDB();
    let webUrl = await urlModel.findById(id).lean();
    return webUrl;
  } catch (error) {
    console.log("error at getWebUrlById", error);
    return error;
  }
};

export const getWebUrlByKeyPair = async (key, value) => {
  try {
    await connectDB();
    const webUrls = await urlModel.findOne({ [key]: value }).lean();
    return webUrls;
  } catch (error) {
    console.log("error at getWebUrlByKeyPair", error);
    return error;
  }
};

export const getAllWebUrls = async () => {
  try {
    await connectDB();
    const webUrls = await urlModel.find({}).lean();
    return webUrls;
  } catch (error) {
    console.log("error at getAllWebUrls", error);
    return error;
  }
};
