import * as s from "@/app/my/terms-of-service/terms-of-service.css";
import { TERMS_SECTIONS } from "@/app/my/terms-of-service/terms-sections-data";

const isBulletLine = (text: string) => text.trimStart().startsWith("-");
const stripBullet = (text: string) => text.trimStart().replace(/^-+\s*/, "");

const TermsOfService = () => {
  return (
    <div className={s.page}>
      {TERMS_SECTIONS.map(({ title, content }) => (
        <div key={title} className={s.contentWrapper}>
          <span className={s.title}>{title}</span>

          <div className={s.content}>
            {content.map((raw, i) => {
              const bullet = isBulletLine(raw);
              const text = bullet ? stripBullet(raw) : raw;

              return (
                <p
                  key={`${title}-${i}`}
                  className={bullet ? s.bulletItem : s.paragraph}
                >
                  {text}
                </p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TermsOfService;
