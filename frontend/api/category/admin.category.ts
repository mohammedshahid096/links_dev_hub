import Service from "@/services";

export const getAdminCategories = async () => {
  const [success, data, status] = await Service.fetchGet("/categories");
  return { success, data, status };
};
