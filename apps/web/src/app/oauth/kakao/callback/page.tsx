import KakaoCallbackClient from "./kakao-callback-client";

type PageProps = {
  searchParams?: {
    code?: string;
    state?: string;
    error?: string;
    error_description?: string;
  };
};

const KakaoCallbackPage = ({ searchParams }: PageProps) => {
  return (
    <KakaoCallbackClient
      code={searchParams?.code ?? null}
      state={searchParams?.state ?? null}
      kakaoError={searchParams?.error ?? null}
      kakaoErrorDesc={searchParams?.error_description ?? null}
    />
  );
};

export default KakaoCallbackPage;
