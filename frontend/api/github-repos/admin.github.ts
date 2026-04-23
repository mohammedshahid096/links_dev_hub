import Service from "@/services";

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

export const getAdminGithubRepos = async (token: string | null) => {
  const [success, data, status] = await Service.fetchGet("/github-repos", token);
  return { success, data, status };
};
