// import { useState, useEffect } from "react";
// import { QuestionType } from "../components/answer-section/answer-section";
// import { WrongDetailData } from "../../components/mocks/wrong-dummy";

// interface WrongEditFormData extends Partial<WrongDetailData> {
//   solution?: string;
// }

// export const useWrongEditForm = (initialData: WrongEditFormData | null) => {
//   const [formData, setFormData] = useState({
//     questionType: "objective" as QuestionType,
//     selectedNumber: null as number | null,
//     answerText: "",
//     solution: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         questionType: initialData.questionType || "objective",
//         selectedNumber: initialData.answerChoice || null,
//         answerText: initialData.answerText || "",
//         solution: initialData.solution || "",
//       });
//     }
//   }, [initialData]);

//   const updateField = (
//     field: "questionType" | "selectedNumber" | "answerText" | "solution",
//     value: QuestionType | number | null | string
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleQuestionTypeChange = (type: QuestionType) => {
//     setFormData((prev) => ({
//       ...prev,
//       questionType: type,
//       selectedNumber: type === "subjective" ? null : prev.selectedNumber,
//       answerText: type === "objective" ? "" : prev.answerText,
//     }));
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       questionType: formData.questionType,
//       answer:
//         formData.questionType === "objective"
//           ? formData.selectedNumber
//           : formData.answerText,
//       solution: formData.solution,
//     };

//     console.log("Submitting to API:", payload);
//     return await updateWrongDetail(payload);
//   };

//   return { formData, updateField, handleQuestionTypeChange, handleSubmit };
// };
