import Image from "next/image";
import * as s from "./login.css";

const OBJECT_FIT_CONTAIN = { objectFit: "contain" } as const;

const DECORATIONS = [
  {
    key: "vector14",
    src: "/login/vector-14.svg",
    wrapperClassName: s.vector14,
  },
  { key: "pencil", src: "/login/pencil.svg", wrapperClassName: s.pencil },
  { key: "multiply", src: "/login/multiply.svg", wrapperClassName: s.multiply },
  { key: "minus", src: "/login/minus.svg", wrapperClassName: s.minus },
  { key: "plus", src: "/login/plus.svg", wrapperClassName: s.plus },
  { key: "divide", src: "/login/divide.svg", wrapperClassName: s.divide },
] as const;

const LoginDecorations = () => {
  return (
    <div className={s.decorations} aria-hidden="true">
      {DECORATIONS.map(({ key, src, wrapperClassName }) => (
        <div key={key} className={wrapperClassName}>
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            style={OBJECT_FIT_CONTAIN}
          />
        </div>
      ))}
    </div>
  );
};

export default LoginDecorations;
