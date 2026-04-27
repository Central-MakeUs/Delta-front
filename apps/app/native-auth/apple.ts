import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

export type AppleSignInResult =
  | { status: "success"; authorizationCode: string }
  | { status: "cancelled" }
  | { status: "unavailable" }
  | { status: "error"; reason: string; message?: string };

export const performAppleLogin = async (): Promise<AppleSignInResult> => {
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
      return { status: "error", reason: "missing-auth-code", message: "인증 코드를 받지 못했습니다." };
    }

    return { status: "success", authorizationCode: credential.authorizationCode };
  } catch (error: any) {
    if (error?.code === "ERR_REQUEST_CANCELED") {
      return { status: "cancelled" };
    }
    return { status: "error", reason: error?.code ?? "sign-in-failed", message: error?.message };
  }
};
