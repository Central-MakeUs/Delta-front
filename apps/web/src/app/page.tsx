import { Button } from "@/shared/components/button/button/button";
import { lightTheme } from "@/shared/styles/theme.css";

export default function Home() {
  return (
    <div className={lightTheme}>
      <Button label="Text" size="32" tone="surface" />
    </div>
  );
}
