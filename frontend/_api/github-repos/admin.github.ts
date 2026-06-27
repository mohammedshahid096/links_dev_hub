import Service from "@/services";
import { APIResponse, GithubReposResponse } from "@/types/admin/github-repo.type";

export interface AddGithubRepoByLinkPayload {
  repoUrl: string;
  id?: string;
}

export interface AddGithubRepoResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
}

export const addGithubRepoByLink = async (
  payload: AddGithubRepoByLinkPayload,
  token: string | null
) => {
  const [success, data, status] = await Service.fetchPost<AddGithubRepoResponse>(
    "/github-repos/add-by-link",
    payload,
    token || undefined
  );
  return { success, data, status };
};

export const getAdminGithubRepos = async (
  token: string | null,
  params?: { page?: string; limit?: string }
) => {
  let url = "/github-repos";
  if (params) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.limit) query.append("limit", params.limit);
    url += `?${query.toString()}`;
  }

  const [success, data, status] = await Service.fetchGet<APIResponse<GithubReposResponse>>(url, token);
  return { success, data, status };
};
