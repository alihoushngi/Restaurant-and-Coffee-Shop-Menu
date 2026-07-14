import getRequest from "@/lib/base/get/get-request";
import { BaseResponse } from "@/lib/base/requestBase.types";
import { getAPIRoute } from "@/lib/base/routes";

const { menu } = getAPIRoute();

export const getDineInCategory = async () => {
  const url = menu.DineInCategory.path;

  const response = await getRequest<BaseResponse<any>, Record<string, never>>({
    url,
    sendAuthorization: false,
  });

  if ("error" in response) {
    console.error("Failed to fetch dine in category:", response.error);
    return null;
  }

  return response.data;
};

export const getDineInItems = async () => {
  const url = menu.DineInItems.path;

  const response = await getRequest<BaseResponse<any>, Record<string, never>>({
    url,
    sendAuthorization: false,
  });

  if ("error" in response) {
    console.error("Failed to fetch dine in items:", response.error);
    return null;
  }

  return response.data;
};

export const getDeliveryItems = async () => {
  const url = menu.DeliveryItems.path;

  const response = await getRequest<BaseResponse<any>, Record<string, never>>({
    url,
    sendAuthorization: false,
  });

  if ("error" in response) {
    console.error("Failed to fetch delivery items:", response.error);
    return null;
  }

  return response.data;
};

export const getDeliveryCategory = async () => {
  const url = menu.DeliveryCategory.path;

  const response = await getRequest<BaseResponse<any>, Record<string, never>>({
    url,
    sendAuthorization: false,
  });

  if ("error" in response) {
    console.error("Failed to fetch delivery category:", response.error);
    return null;
  }

  return response.data;
};
