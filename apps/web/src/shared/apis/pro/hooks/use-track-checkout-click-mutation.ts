import { useMutation } from "@tanstack/react-query";
import { trackCheckoutClick } from "@/shared/apis/pro/pro-api";
import type { TrackCheckoutClickResponse } from "@/shared/apis/pro/pro-types";
import type { ApiError } from "@/shared/apis/api-error";

export const useTrackCheckoutClickMutation = () =>
  useMutation<TrackCheckoutClickResponse, ApiError, void>({
    mutationFn: () => trackCheckoutClick(),
    onError: () => undefined,
  });
