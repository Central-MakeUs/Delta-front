import { Suspense } from "react";
import AppleCallbackView from "./apple-callback-client";

const Fallback = () => (
  <main
    style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}
  >
    <p style={{ fontSize: 16, color: "#666" }}>로그인 처리 중...</p>
  </main>
);

const AppleCallbackPage = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <AppleCallbackView />
    </Suspense>
  );
};

export default AppleCallbackPage;
