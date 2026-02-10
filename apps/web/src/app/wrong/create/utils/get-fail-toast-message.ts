export const getFailToastMessage = (reason: string) => {
  switch (reason) {
    case "OCR_TEXT_EMPTY":
      return "텍스트가 인식되지 않는 이미지예요. 문제 사진을 다시 업로드해 주세요.";
    case "OCR_NOT_MATH":
    case "AI_NOT_MATH":
      return "수학 문제와 무관한 이미지예요. 문제 사진을 다시 업로드해 주세요.";
    default:
      return "문제 이미지를 인식할 수 없어요. 다시 업로드해 주세요.";
  }
};
