import type { AxiosRequestConfig } from "axios";
import { instance } from "@/shared/apis/api";
import { API_PATHS } from "@/shared/apis/constants/api-paths";
import type { ApiResponse } from "@/shared/apis/api-types";
import { unwrapApiResponse } from "@/shared/apis/api-types";
import type { TrackCheckoutClickResponse } from "@/shared/apis/pro/pro-types";

export const trackCheckoutClick = () => {
  const config = { _skipAuthRefresh: true } as AxiosRequestConfig;

  return instance
    .post<ApiResponse<TrackCheckoutClickResponse>>(
      API_PATHS.PRO.CHECKOUT_CLICK,
      null,
      config
    )
    .then((res) => res.data)
    .then(unwrapApiResponse);
};
