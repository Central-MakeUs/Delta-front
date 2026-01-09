import * as s from "./hero-background.css";

const HeroBackground = () => {
  return (
    <div className={s.wrap} aria-hidden>
      <img
        className={s.pinwheel}
        src="/my-page/hero-pinwheel.svg"
        alt="pinwheel"
      />
      <img
        className={s.diagonal1}
        src="/my-page/hero-diagonal-1.svg"
        alt="diagonal1"
      />
      <img
        className={s.diagonal2}
        src="/my-page/hero-diagonal-2.svg"
        alt="diagonal2"
      />
    </div>
  );
};

export default HeroBackground;
