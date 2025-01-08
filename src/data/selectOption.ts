export const selectYearData = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const years = Array.from({ length: 30 }, (_, index) => {
    const year = currentYear - (29 - index);
    return { value: `${year}`, label: `${year}` };
  });
  return years.reverse();
};

export const selectMonthData = () => [
  { value: '전체', label: '전체' },
  ...Array.from({ length: 12 }, (_, index) => {
    return { value: `${index + 1}`, label: `${index + 1}` };
  })
];
