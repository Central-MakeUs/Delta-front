import KakaoCallbackClient from "./kakao-callback-client";

type SearchParams = {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

const KakaoCallbackPage = async ({ searchParams }: PageProps) => {
  const params = searchParams ? await searchParams : undefined;

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
