import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

export type AppleLoginResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "unavailable" }
  | { status: "error"; message: string };

export const performAppleLogin = async (): Promise<AppleLoginResult> => {
  if (Platform.OS !== "ios") {
    return { status: "unavailable" };
  }

  const isAvailable = await AppleAuthentication.isAvailableAsync();
  if (!isAvailable) {
    return { status: "unavailable" };
  }

  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.authorizationCode) {
      return { status: "error", message: "인증 코드를 받지 못했습니다." };
    }

    return { status: "success", authorizationCode: credential.authorizationCode };
  } catch (error: any) {
    if (error?.code === "ERR_REQUEST_CANCELED") {
      return { status: "cancelled" };
    }
    return { status: "error", message: error?.message ?? "Apple 로그인 실패" };
  }
};
