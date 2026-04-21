"use client";

import { useState } from "react";
import { Button } from "@/shared/components/button/button/button";
import CompleteModal from "@/shared/components/modal/complete-modal/complete-modal";
import AiSolutionText from "@/app/wrong/create/components/ai-solution-text/ai-solution-text";
import ScanAnswerSection from "@/app/wrong/scans/[id]/components/scan-answer-section";
import ScanBottomNav from "@/app/wrong/scans/[id]/components/scan-bottom-nav";
import ScanDetailHero from "@/app/wrong/scans/[id]/components/scan-detail-hero";
import ScanEditModal from "@/app/wrong/scans/[id]/components/scan-edit-modal";
import { useWrongScanDetail } from "@/app/wrong/scans/[id]/hooks/use-wrong-scan-detail";
import * as s from "@/app/wrong/scans/[id]/page.css";

const WrongScanDetailPage = () => {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const {
    isReady,
    displayItem,
    prevItem,
    nextItem,
    availableUnits,
    resolvedSelectedUnit,
    customSelectedTypes,
    problemTypes,
    selectedSubject,
    selectedTypes,
    customTypeDraft,
    isDirectAddOpen,
    isEditModalOpen,
    answerMode,
    answerChoice,
    answerText,
    isCompleteDisabled,
    moveTo,
    handleComplete,
    handleEditModalClose,
    handleEditApply,
    handleSubjectChange,
    handleTypeToggle,
    handleCustomTypeRemove,
    handleCustomTypeMove,
    handleDirectAddSubmit,
    handleAnswerModeChange,
    handleAnswerChoiceChange,
    handleAnswerTextChange,
    openEditModal,
    setSelectedUnit,
    setCustomTypeDraft,
    openDirectAdd,
    closeDirectAdd,
  } = useWrongScanDetail();

  if (!isReady || !displayItem) return null;

  return (
    <div className={s.page}>
      <div className={s.body}>
        <ScanDetailHero item={displayItem} onEditClick={openEditModal} />

        <ScanAnswerSection
          answerMode={answerMode}
          answerChoice={answerChoice}
          answerText={answerText}
          onAnswerModeChange={handleAnswerModeChange}
          onAnswerChoiceChange={handleAnswerChoiceChange}
          onAnswerTextChange={handleAnswerTextChange}
        />

        <AiSolutionText />
      </div>

      <ScanBottomNav prevItem={prevItem} nextItem={nextItem} onMove={moveTo} />

      <div className={s.bottomAction}>
        <Button
          fullWidth
          size="48"
          tone="dark"
          label="완료"
          onClick={() => setIsCompleteModalOpen(true)}
          disabled={isCompleteDisabled}
        />
      </div>

      <ScanEditModal
        isOpen={isEditModalOpen}
        selectedSubject={selectedSubject}
        availableUnits={availableUnits}
        selectedUnit={resolvedSelectedUnit}
        selectedTypes={selectedTypes}
        customSelectedTypes={customSelectedTypes}
        problemTypes={problemTypes}
        customTypeDraft={customTypeDraft}
        isDirectAddOpen={isDirectAddOpen}
        onClose={handleEditModalClose}
        onApply={handleEditApply}
        onSubjectChange={handleSubjectChange}
        onUnitChange={setSelectedUnit}
        onTypeToggle={handleTypeToggle}
        onCustomTypeRemove={handleCustomTypeRemove}
        onCustomTypeMove={handleCustomTypeMove}
        onCustomTypeDraftChange={setCustomTypeDraft}
        onDirectAddOpen={openDirectAdd}
        onDirectAddClose={closeDirectAdd}
        onDirectAddSubmit={handleDirectAddSubmit}
      />

      <CompleteModal
        title="모든 문제를 등록할까요?"
        description="완료를 누르면 등록한 문제가 모두 오답 목록에 저장돼요."
        cancelLabel="취소"
        confirmLabel={isCompleteDisabled ? "처리 중..." : "완료"}
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        onConfirm={handleComplete}
      />
    </div>
  );
};

export default WrongScanDetailPage;
