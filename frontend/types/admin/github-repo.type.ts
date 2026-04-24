export interface GithubRepo {
  id: string;
  repoId: number;
  username: string;
  repoName: string;
  description: string | null;
  url: string;
  language: string | null;
  topics: string[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  websiteId: string | null;
}

export interface GithubReposResponse {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  repos: GithubRepo[];
}

export interface APIResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
