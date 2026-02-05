export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const prevMonthLastDay = new Date(year, month, 0);
  const prevMonthDays = prevMonthLastDay.getDate();

  const days: Array<{
    day: number;
    isCurrentMonth: boolean;
    isPrevMonth: boolean;
  }> = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

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

export const isFutureDate = (
  day: number,
  isCurrentMonth: boolean,
  isPrevMonth: boolean,
  currentMonth: Date
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let checkDate: Date;
  if (isCurrentMonth) {
    checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
  } else if (isPrevMonth) {
    const prevMonth =
      currentMonth.getMonth() === 0 ? 11 : currentMonth.getMonth() - 1;
    const prevYear =
      currentMonth.getMonth() === 0
        ? currentMonth.getFullYear() - 1
        : currentMonth.getFullYear();
    checkDate = new Date(prevYear, prevMonth, day);
  } else {
    const nextMonth =
      currentMonth.getMonth() === 11 ? 0 : currentMonth.getMonth() + 1;
    const nextYear =
      currentMonth.getMonth() === 11
        ? currentMonth.getFullYear() + 1
        : currentMonth.getFullYear();
    checkDate = new Date(nextYear, nextMonth, day);
  }
  checkDate.setHours(0, 0, 0, 0);

  return checkDate > today;
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
