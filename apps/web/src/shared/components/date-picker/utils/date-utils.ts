export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // 저번달 정보 계산
  const prevMonthLastDay = new Date(year, month, 0);
  const prevMonthDays = prevMonthLastDay.getDate();

  const days: Array<{ day: number; isCurrentMonth: boolean } | null> = [];

  // 저번달 날짜 추가
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
    });
  }

  // 이번달 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
    });
  }

  return days;
};

export const isSelectedDate = (
  day: number | null,
  isCurrentMonth: boolean,
  tempSelectedDate: Date | null,
  currentMonth: Date
) => {
  if (!day || !tempSelectedDate) return false;
  if (!isCurrentMonth) {
    // 저번달 날짜인 경우
    const prevMonth =
      currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
    const prevYear =
      currentMonth.getMonth() === 0
        ? currentMonth.getFullYear() - 1
        : currentMonth.getFullYear();
    return (
      day === tempSelectedDate.getDate() &&
      prevMonth === tempSelectedDate.getMonth() &&
      prevYear === tempSelectedDate.getFullYear()
    );
  }
  return (
    day === tempSelectedDate.getDate() &&
    currentMonth.getMonth() === tempSelectedDate.getMonth() &&
    currentMonth.getFullYear() === tempSelectedDate.getFullYear()
  );
};

export const isToday = (
  day: number | null,
  isCurrentMonth: boolean,
  currentMonth: Date
) => {
  if (!day) return false;
  const today = new Date();
  if (!isCurrentMonth) {
    // 저번달 날짜인 경우
    const prevMonth =
      currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
    const prevYear =
      currentMonth.getMonth() === 0
        ? currentMonth.getFullYear() - 1
        : currentMonth.getFullYear();
    return (
      day === today.getDate() &&
      prevMonth === today.getMonth() &&
      prevYear === today.getFullYear()
    );
  }
  return (
    day === today.getDate() &&
    currentMonth.getMonth() === today.getMonth() &&
    currentMonth.getFullYear() === today.getFullYear()
  );
};

export const getYearList = (yearRange: { start: number; end: number }) => {
  const years: number[] = [];
  // 12개 연도 생성 (start부터 정확히 12개)
  const start = yearRange.start;
  const adjustedEnd = start + 11; // start부터 11개 더하면 총 12개

  for (let i = start; i <= adjustedEnd; i++) {
    years.push(i);
  }

  return years;
};
