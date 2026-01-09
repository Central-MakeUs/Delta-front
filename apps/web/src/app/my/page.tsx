import MyPageView from "./components/my-page-view/my-page-view";

const MyPagePage = async () => {
  // TODO: 실제 세션/유저 데이터로 교체
  return (
    <MyPageView
      userName="김수학"
      linkedEmail="mathlove@kakao.com"
      profileImageUrl={null}
    />
  );
};

export default MyPagePage;
