import Service from "@/services";

export const getPublicCategories = async () => {
  const [success, data, status] = await Service.fetchGet("/categories", null);
  return { success, data, status };
};
