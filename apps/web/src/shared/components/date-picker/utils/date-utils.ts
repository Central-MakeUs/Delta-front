export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0(일) ~ 6(토)

  const prevMonthLastDay = new Date(year, month, 0);
  const prevMonthDays = prevMonthLastDay.getDate();

  const days: Array<{
    day: number;
    isCurrentMonth: boolean;
    isPrevMonth: boolean;
  }> = [];

  // 1. 이전 달 날짜 채우기 (첫 번째 주의 시작 전 빈칸)
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // 2. 이번 달 날짜 채우기
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // 3. 다음 달 날짜 채우기 (가변적 주 처리)
  // 현재까지 쌓인 날짜 수가 7의 배수가 아니라면, 그 주의 남은 칸을 다음 달 날짜로 채웁니다.
  const currentTotalSlots = days.length;
  const remainingSlots =
    currentTotalSlots % 7 === 0 ? 0 : 7 - (currentTotalSlots % 7);

  for (let i = 1; i <= remainingSlots; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  return days;
};

/**
 * 날짜 일치 여부를 확인하는 헬퍼 함수
 */
const checkDateMatch = (
  day: number,
  isCurrentMonth: boolean,
  currentMonth: Date,
  targetDate: Date
) => {
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetDay = targetDate.getDate();

  let checkDate: Date;
  if (isCurrentMonth) {
    checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
  } else {
    // 15일 기준으로 이전 달인지 다음 달인지 판별
    const isPrev = day > 15;
    const offset = isPrev ? -1 : 1;
    checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + offset,
      day
    );
  }

  return (
    checkDate.getDate() === targetDay &&
    checkDate.getMonth() === targetMonth &&
    checkDate.getFullYear() === targetYear
  );
};

export const isSelectedDate = (
  day: number | null,
  isCurrentMonth: boolean,
  tempSelectedDate: Date | null,
  currentMonth: Date
) => {
  if (!day || !tempSelectedDate) return false;
  return checkDateMatch(day, isCurrentMonth, currentMonth, tempSelectedDate);
};

export const isToday = (
  day: number | null,
  isCurrentMonth: boolean,
  currentMonth: Date
) => {
  if (!day) return false;
  return checkDateMatch(day, isCurrentMonth, currentMonth, new Date());
};

export const getYearList = (yearRange: { start: number; end: number }) => {
  const years: number[] = [];
  const start = yearRange.start;
  const adjustedEnd = start + 11;
  for (let i = start; i <= adjustedEnd; i++) {
    years.push(i);
  }
  return years;
};
