import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const SECURE_ACCESS_KEY = "delta_access_token";
const SECURE_REFRESH_KEY = "delta_refresh_token";

const WEB_ACCESS_KEY = "delta:access-token";
const WEB_REFRESH_KEY = "delta:refresh-token";

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type TokenBridgeMessage =
  | { type: "TOKEN_UPDATE"; accessToken: string | null; refreshToken: string | null }
  | { type: "TOKEN_CLEAR" };

const readTokens = async (): Promise<Tokens> => {
  try {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getItemAsync(SECURE_ACCESS_KEY),
      SecureStore.getItemAsync(SECURE_REFRESH_KEY),
    ]);
    return { accessToken, refreshToken };
  } catch {
    return { accessToken: null, refreshToken: null };
  }
};

const saveTokens = async (tokens: Tokens): Promise<void> => {
  try {
    await Promise.all([
      tokens.accessToken
        ? SecureStore.setItemAsync(SECURE_ACCESS_KEY, tokens.accessToken)
        : SecureStore.deleteItemAsync(SECURE_ACCESS_KEY),
      tokens.refreshToken
        ? SecureStore.setItemAsync(SECURE_REFRESH_KEY, tokens.refreshToken)
        : SecureStore.deleteItemAsync(SECURE_REFRESH_KEY),
    ]);
  } catch {}
};

const clearTokens = async (): Promise<void> => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(SECURE_ACCESS_KEY),
      SecureStore.deleteItemAsync(SECURE_REFRESH_KEY),
    ]);
  } catch {}
};

const buildInjectionScript = ({ accessToken, refreshToken }: Tokens): string => {
  const sets: string[] = [];
  if (accessToken) {
    sets.push(`localStorage.setItem(${JSON.stringify(WEB_ACCESS_KEY)},${JSON.stringify(accessToken)});`);
  }
  if (refreshToken) {
    sets.push(`localStorage.setItem(${JSON.stringify(WEB_REFRESH_KEY)},${JSON.stringify(refreshToken)});`);
  }
  if (!sets.length) return "true;";
  return `(function(){try{${sets.join("")}}catch(e){}})();true;`;
};

export function useWebViewNativeTokenStorage() {
  const [initialScript, setInitialScript] = useState<string | undefined>(undefined);

  useEffect(() => {
    void readTokens().then((tokens) => {
      setInitialScript(buildInjectionScript(tokens));
    });
  }, []);

  const handleTokenMessage = (msg: TokenBridgeMessage) => {
    if (msg.type === "TOKEN_UPDATE") {
      void saveTokens({ accessToken: msg.accessToken, refreshToken: msg.refreshToken });
    } else if (msg.type === "TOKEN_CLEAR") {
      void clearTokens();
    }
  };

  return { initialScript, handleTokenMessage };
}
