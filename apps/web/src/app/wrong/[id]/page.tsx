"use client";

import { useState } from "react";
import Chip from "@/shared/components/chip/chip";
import Icon from "@/shared/components/icon/icon";
import { vars } from "@/shared/styles/theme.css";
import * as styles from "./wrong-detail.css";
import TextField from "@/shared/components/text-field/text-field";

const dummyData = {
  title: "공통수학1",
  chips: [
    {
      label: "다항식",
    },
    {
      label: "수열",
    },
  ],
};
/* 오답 상세 페이지 */
const WrongDetailPage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [solution, setSolution] = useState("");

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {/* 헤더 섹션 */}
          <div className={styles.headerSection}>
            <Chip
              size="md"
              shape="pill"
              tone="solid"
              label={dummyData.title}
              state="active"
            />
            <div className={styles.headerTop}>
              <h1 className={styles.title}>공통수학1 문제</h1>
              <div className={styles.headerChips}>
                {dummyData.chips.map((chip) => (
                  <Chip
                    key={chip.label}
                    size="md"
                    shape="square"
                    label={chip.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 이미지 영역 */}
          <div className={styles.imageContainer}>
            {/* 이미지가 있으면 여기에 표시 */}
            <div style={{ color: vars.color.grayscale[400] }}>이미지 영역</div>
          </div>

          {/* 입력 섹션 */}
          <div className={styles.inputSection}>
            <div className={styles.inputContent}>
              {/* 정답 확인 버튼 */}
              <div className={styles.answerButtonWrapper}>
                {!showAnswer ? (
                  <div className={styles.answerButtonOverlay}>
                    <div className={styles.answerButtonContent}>
                      <Icon name="edit" size={2.4} />
                      <span className={styles.answerButtonText}>
                        눌러서 정답을 확인해보세요.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.answerChipWrapper}>
                    <Chip size="md" shape="pill" label="정답" />
                    <span className={styles.answerNumber}>5번</span>
                  </div>
                )}
                {/* 수정 필요: button 컴포넌트 사용 */}
                <button
                  type="button"
                  onClick={handleShowAnswer}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    background: "transparent",
                    border: "none",
                    cursor: showAnswer ? "default" : "pointer",
                    zIndex: showAnswer ? 0 : 2,
                  }}
                  disabled={showAnswer}
                  aria-label="정답 확인"
                />
              </div>

              {/* 풀이 입력 필드 */}
              <div className={styles.solutionInputWrapper}>
                <TextField
                  fullWidth
                  prefix={<Chip size="md" shape="pill" label="풀이" />}
                  placeholder="풀이를 입력해주세요."
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  size="body3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className={styles.bottomButtonContainer}>
        <div className={styles.bottomButtonWrapper}>
          {/* <Button
            label="오답 완료"
            size="48"
            tone="dark"
            icon="check-mark"
            iconSize={2.4}
            fullWidth
            onClick={handleConfirm}
            className={styles.bottomButton}
          /> */}
          {/* 수정 필요: Button 컴포넌트 사용 */}
          <button type="button" className={styles.bottomButton}>
            <Icon name="check-mark" size={2.4} />
            오답 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrongDetailPage;
