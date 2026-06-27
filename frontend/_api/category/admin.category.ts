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

export const updateAdminCategory = async (id: string | number, payload: Partial<CreateCategoryPayload>, token: string | null) => {
  const [success, data, status] = await Service.fetchPut(`/categories/${id}`, payload, token || undefined);
  return { success, data, status };
};

export const deleteAdminCategory = async (id: string | number, token: string | null) => {
  const [success, data, status] = await Service.fetchDelete(`/categories/${id}`, token || undefined);
  return { success, data, status };
};

export const getAdminCategoryBySlug = async (slug: string, token: string | null) => {
  const [success, data, status] = await Service.fetchGet(`/categories/slug/${slug}`, token || undefined);
  return { success, data, status };
};
