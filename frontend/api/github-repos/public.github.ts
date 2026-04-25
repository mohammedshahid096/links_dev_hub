import Service from "@/services";
import { APIResponse, GithubReposResponse } from "@/types/admin/github-repo.type";

export interface GetGithubReposQuery {
  page?: string | number;
  limit?: string | number;
  search?: string;
  sortBy?: string;
}

/**
 * Public discovery of GitHub repositories - no token required.
 */
export const getPublicGithubRepos = async (query: GetGithubReposQuery) => {
  const queryParams = new URLSearchParams();
  if (query.page) queryParams.append("page", query.page.toString());
  if (query.limit) queryParams.append("limit", query.limit.toString());
  if (query.search) queryParams.append("search", query.search);
  if (query.sortBy) queryParams.append("sortBy", query.sortBy);

  const queryString = queryParams.toString();
  const url = queryString ? `/github-repos?${queryString}` : "/github-repos";

  const [success, data, status] = await Service.fetchGet<APIResponse<GithubReposResponse>>(url, null);
  return { success, data, status };
};
