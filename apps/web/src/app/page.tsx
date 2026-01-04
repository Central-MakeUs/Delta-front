import { Button } from "@/shared/components/button/button/button";
import { lightTheme } from "@/shared/styles/theme.css";

const Home = () => {
  return (
    <div className={lightTheme}>
      <Button label="Text" size="32" tone="surface" />
      <Button label="Text" size="40" icon="star" />
    </div>
  );
};

export default Home;
