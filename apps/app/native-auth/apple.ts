import * as AppleAuthentication from 'expo-apple-authentication';

export const performAppleLogin = async (): Promise<{ authorizationCode: string }> => {
  const result = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!result.authorizationCode) {
    throw new Error('Apple로부터 인증 코드를 받지 못했습니다.');
  }

  return { authorizationCode: result.authorizationCode };
};
