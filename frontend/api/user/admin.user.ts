import Service from "@/services";
import { UsersResponse } from "@/types/admin/user.type";

export const getAdminUsers = async (
  params: {
    page?: string | number;
    limit?: string | number;
    search?: string;
    role?: string;
  },
  token: string | null
): Promise<{ success: boolean; data: UsersResponse }> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.search) queryParams.append("search", params.search);
  if (params.role) queryParams.append("role", params.role);

  const [success, data] = await Service.fetchGet<UsersResponse>(
    `/admin/users?${queryParams.toString()}`,
    token
  );

  return { success, data };
};
