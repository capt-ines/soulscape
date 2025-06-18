export const getRandomRGBColor = () => {
  const random = () => Math.floor(Math.random() * 256);
  return `rgb(${random()}, ${random()}, ${random()})`;
};
