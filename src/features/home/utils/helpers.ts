export const getRandomColor = (colors: readonly string[]) => {
  return colors[Math.floor(Math.random() * colors.length)];
};
