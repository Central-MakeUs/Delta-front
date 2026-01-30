import { Suspense } from "react";
import { ErrorPageContent } from "./error-page-content";
import { ErrorPageContentWrapper } from "./error-page-content-wrapper";

const ErrorPage = () => {
  return (
    <Suspense fallback={<ErrorPageContent errorType="500" />}>
      <ErrorPageContentWrapper />
    </Suspense>
  );
};

export default ErrorPage;
