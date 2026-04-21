import GoogleCallbackClient from "./google-callback-client";

type SearchParams = {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

const GoogleCallbackPage = async ({ searchParams }: PageProps) => {
  const params = searchParams ? await searchParams : undefined;

  return (
    <GoogleCallbackClient
      code={params?.code ?? null}
      state={params?.state ?? null}
      googleError={params?.error ?? null}
      googleErrorDesc={params?.error_description ?? null}
    />
  );
};

export default GoogleCallbackPage;
