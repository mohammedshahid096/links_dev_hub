import Service from "@/services";

export interface WatchlistedWebsite {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  iconUrl: string;
}

export interface WatchlistItem {
  id: string;
  website: WatchlistedWebsite;
}

export interface WatchlistResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    watchlists: WatchlistItem[];
  };
}

export const getWatchlistsApi = async (
  token: string | null,
  params?: { page?: string | number; limit?: string | number; title?: string }
): Promise<{ success: boolean; data: WatchlistResponse; status?: number }> => {
  let url = "/website-watchlist";
  if (params) {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.title) query.append("title", params.title);
    url += `?${query.toString()}`;
  }

  const [success, data, status] = await Service.fetchGet<WatchlistResponse>(
    url,
    token
  );
  return { success, data, status };
};

export const addWatchlistApi = async (
  websiteId: string,
  token: string | null
): Promise<{ success: boolean; data: any; status?: number }> => {
  const [success, data, status] = await Service.fetchPost<any>(
    `/website-watchlist`,
    { websiteId },
    token ?? undefined
  );
  return { success, data, status };
};

export const deleteWatchlistApi = async (
  id: string,
  token: string | null
): Promise<{ success: boolean; data: any; status?: number }> => {
  const [success, data, status] = await Service.fetchDelete<any>(
    `/website-watchlist/${id}`,
    token
  );
  return { success, data, status };
};
