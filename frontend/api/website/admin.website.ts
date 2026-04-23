import Service from "@/services";

export interface GetWebsitesQuery {
  sortBy?: string;
  searchTitle?: string;
  page?: string | number;
  limit?: string | number;
  categoryId?: string;
}

export interface WebsiteTitle {
  id: string;
  title: string;
}

export interface WebsiteTitlesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: WebsiteTitle[];
}

export const getAdminWebsites = async (query: GetWebsitesQuery, token: string | null) => {
  const queryParams = new URLSearchParams();
  if (query.sortBy) queryParams.append("sortBy", query.sortBy);
  if (query.searchTitle) queryParams.append("searchTitle", query.searchTitle);
  if (query.page) queryParams.append("page", query.page.toString());
  if (query.limit) queryParams.append("limit", query.limit.toString());
  if (query.categoryId) queryParams.append("categoryId", query.categoryId);

  const queryString = queryParams.toString();

  const url = queryString ? `/websites?${queryString}` : "/websites";

  const [success, data, status] = await Service.fetchGet(url, token);
  return { success, data, status };
};

export const getAdminWebsiteBySlug = async (slug: string, token: string | null) => {
  const [success, data, status] = await Service.fetchGet(`/websites/slug/${slug}`, token);
  return { success, data, status };
};

export interface AddWebsiteByUrlPayload {
  url: string;
  categoryId: string;
}

export const addWebsiteByUrl = async (payload: AddWebsiteByUrlPayload, token: string | null) => {
  const [success, data, status] = await Service.fetchPost("/websites/add-by-website", payload, token || undefined);
  return { success, data, status };
};

export const updateAdminWebsite = async (id: string, payload: any, token: string | null) => {
  const [success, data, status] = await Service.fetchPut(`/websites/${id}`, payload, token || undefined);
  return { success, data, status };
};

export const getAllWebsiteTitles = async (token: string | null) => {
  const [success, data, status] = await Service.fetchGet<WebsiteTitlesResponse>(
    "/websites/all-titiles",
    token
  );
  return { success, data, status };
};
