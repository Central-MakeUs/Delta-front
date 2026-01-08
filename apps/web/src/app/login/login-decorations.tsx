import Image from "next/image";
import * as s from "./login.css";

export const LoginDecorations = () => {
  return (
    <div className={s.decorations} aria-hidden>
      <div className={s.vector14}>
        <Image
          src="/login/vector-14.svg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={s.pencil}>
        <Image
          src="/login/pencil.svg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={s.multiply}>
        <Image
          src="/login/multiply.svg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={s.minus}>
        <Image
          src="/login/minus.svg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={s.plus}>
        <Image
          src="/login/plus.svg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className={s.divide}>
        <Image
          src="/login/divide.svg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default LoginDecorations;
