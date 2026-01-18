import Icon from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button/button";
import * as styles from "./profile-section.css";

const ProfileSection = () => {
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileImage}>
        <div className={styles.profileImagePlaceholder}>
          <Icon name="default-profile" size={9.4} />
        </div>
      </div>
      <Button label="" icon="graphic-camera" iconSize={1.6} className={styles.cameraButton} />
    </div>
  );
};

export default ProfileSection;
