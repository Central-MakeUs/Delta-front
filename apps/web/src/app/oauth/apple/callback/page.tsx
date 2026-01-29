import AppleCallbackClient from "./apple-callback-client";

type SearchParams = {
  state?: string;
  error?: string;
};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

const AppleCallbackPage = async ({ searchParams }: PageProps) => {
  const params = searchParams ? await searchParams : undefined;

  return (
    <AppleCallbackClient
      state={params?.state ?? null}
      error={params?.error ?? null}
    />
  );
};

export default AppleCallbackPage;
