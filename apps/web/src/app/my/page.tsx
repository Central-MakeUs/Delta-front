import MyPageView from "@/app/my/components/my-page-view/my-page-view";

const MOCK_USER = {
  userName: "김수학",
  linkedEmail: "mathlove@kakao.com",
  profileImageUrl: null as string | null,
} as const;

const MyPagePage = async () => {
  return <MyPageView {...MOCK_USER} />;
};

export default MyPagePage;
