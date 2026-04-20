import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export const performGoogleLogin = async (): Promise<{ serverAuthCode: string }> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const result = await GoogleSignin.signIn();
  const serverAuthCode = result.data?.serverAuthCode;

  if (!serverAuthCode) {
    throw new Error("Google 서버 인증 코드를 받지 못했습니다.");
  }

  return { serverAuthCode };
};

export { statusCodes as googleStatusCodes };
