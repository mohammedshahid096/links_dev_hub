import Service from "@/services";

export const getAdminCategories = async (token: string | null) => {
  const [success, data, status] = await Service.fetchGet("/categories", token);
  return { success, data, status };
};

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  isActive?: boolean;
}

export const createAdminCategory = async (payload: CreateCategoryPayload, token: string | null) => {
  const [success, data, status] = await Service.fetchPost("/categories", payload, token || undefined);
  return { success, data, status };
};
