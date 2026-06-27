import Service from "@/services";

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  profileUrl: string;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProfileUser;
}

export const getProfileApi = async (
  token: string | null
): Promise<{ success: boolean; data: ProfileResponse; status?: number }> => {
  const [success, data, status] = await Service.fetchGet<ProfileResponse>(
    "/auth/profile",
    token
  );
  return { success, data, status };
};
