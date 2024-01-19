export const changeColor = (newColor: string) => {
  document.documentElement.style.setProperty('--primary-color', newColor);
};
