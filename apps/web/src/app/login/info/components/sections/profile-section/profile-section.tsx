import Icon from "@/shared/components/icon/icon";
import * as styles from "./profile-section.css";

const ProfileSection = () => {
  return (
    <div className={styles.profileSection}>
      <div className={styles.profileImage}>
        <div className={styles.profileImagePlaceholder}>
          <Icon name="default-profile1" size={9.4} />
        </div>
        <Icon name="camera" size={2} className={styles.cameraButton} />
      </div>
    </div>
  );
};

export default ProfileSection;
