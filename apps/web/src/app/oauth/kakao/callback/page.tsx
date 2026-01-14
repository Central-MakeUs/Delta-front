import KakaoCallbackClient from "./kakao-callback-client";

type PageProps = {
  searchParams?: {
    code?: string;
    state?: string;
    error?: string;
    error_description?: string;
  };
};

const KakaoCallbackPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  return (
    <KakaoCallbackClient
      code={params?.code ?? null}
      state={params?.state ?? null}
      kakaoError={params?.error ?? null}
      kakaoErrorDesc={params?.error_description ?? null}
    />
  );
};

export default KakaoCallbackPage;
