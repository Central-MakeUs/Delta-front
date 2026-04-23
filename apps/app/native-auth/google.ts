import { Platform } from "react-native";
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from "@react-native-google-signin/google-signin";

export type GoogleSignInResult =
  | { status: "success"; serverAuthCode: string }
  | { status: "cancelled" }
  | { status: "error"; reason: string; message?: string };

export const performGoogleLogin = async (): Promise<GoogleSignInResult> => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "",
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? undefined,
    offlineAccess: true,
  });

  try {
    if (Platform.OS === "android") {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    }

    const response = await GoogleSignin.signIn();

    if (response.type === "cancelled") {
      return { status: "cancelled" };
    }

    const serverAuthCode = response.data?.serverAuthCode;
    if (!serverAuthCode) {
      return {
        status: "error",
        reason: "missing-auth-code",
        message: "서버 인증 코드를 받지 못했습니다.",
      };
    }

    return { status: "success", serverAuthCode };
  } catch (error) {
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return { status: "cancelled" };
      }
      return {
        status: "error",
        reason: String(error.code),
        message: error.message,
      };
    }
    return { status: "error", reason: "unknown", message: "구글 로그인 실패" };
  }
};
