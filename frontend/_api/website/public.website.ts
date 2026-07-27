import Service from "@/services";

export interface GetWebsitesQuery {
  sortBy?: string;
  searchTitle?: string;
  page?: string | number;
  limit?: string | number;
  categorySlug?: string;
}

/**
 * Public discovery of websites - no token required.
 */
export const getPublicWebsites = async (query: GetWebsitesQuery) => {
  const queryParams = new URLSearchParams();
  if (query.sortBy) queryParams.append("sortBy", query.sortBy);
  if (query.searchTitle) queryParams.append("searchTitle", query.searchTitle);
  if (query.page) queryParams.append("page", query.page.toString());
  if (query.limit) queryParams.append("limit", query.limit.toString());
  if (query.categorySlug) queryParams.append("categorySlug", query.categorySlug);

  const queryString = queryParams.toString();
  const url = queryString ? `/websites?${queryString}` : "/websites";

  const [success, data, status] = await Service.fetchGet(url, null);
  return { success, data, status };
};

/**
 * Get a single website by slug - public access.
 */
export const getPublicWebsiteBySlug = async (slug: string) => {
  const [success, data, status] = await Service.fetchGet(
    `/websites/slug/${slug}`,
    null,
  );
  return { success, data, status };
};
