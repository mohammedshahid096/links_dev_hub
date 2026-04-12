import Service from "@/services";

export interface GetWebsitesQuery {
  sortBy?: string;
  searchTitle?: string;
  page?: string | number;
  limit?: string | number;
}

export const getAdminWebsites = async (query: GetWebsitesQuery, token: string | null) => {
  const queryParams = new URLSearchParams();
  if (query.sortBy) queryParams.append("sortBy", query.sortBy);
  if (query.searchTitle) queryParams.append("searchTitle", query.searchTitle);
  if (query.page) queryParams.append("page", query.page.toString());
  if (query.limit) queryParams.append("limit", query.limit.toString());

  const queryString = queryParams.toString();
  const url = queryString ? `/websites?${queryString}` : "/websites";

  const [success, data, status] = await Service.fetchGet(url, token);
  return { success, data, status };
};
