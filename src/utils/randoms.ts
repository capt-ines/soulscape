export const randomize = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const getRandomRGBColor = () => {
  const random = () => Math.floor(Math.random() * 256);
  return `rgb(${random()}, ${random()}, ${random()})`;
};

export const getRandomOne = () => {
  return Math.random() < 0.5 ? 1 : -1;
};

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
