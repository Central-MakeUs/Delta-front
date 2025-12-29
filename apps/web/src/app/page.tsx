import Button from "@/shared/components/button/button";
import { lightTheme } from "@/shared/styles/theme.css";

export default function Home() {
  return (
    <div className={lightTheme}>
      <Button size="lg">큰 버튼</Button>
      <Button size="sm">작은 버튼</Button>
    </div>
  );
}
