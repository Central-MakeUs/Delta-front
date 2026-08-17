import Icon from "@/shared/components/icon/icon";
import type { CoachMarkFeature } from "@/shared/components/coach-mark/types/coach-mark";
import * as s from "@/shared/components/coach-mark/welcome-step/components/welcome-feature-list.css";

type WelcomeFeatureListProps = {
  items: readonly CoachMarkFeature[];
};

export const WelcomeFeatureList = ({ items }: WelcomeFeatureListProps) => {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li key={item.id} className={s.item}>
          <span className={s.iconCircle}>
            <Icon name={item.iconName} size={2.2} />
          </span>

          <div className={s.texts}>
            <p className={s.title}>{item.title}</p>
            <p className={s.description}>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WelcomeFeatureList;
