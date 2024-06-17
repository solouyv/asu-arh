import { Theme } from "@enums/Theme";

function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAPathWithParametr(
  mainPath: string,
  paramert: string,
  childPathIsParametr: boolean,
): string {
  if (childPathIsParametr) {
    return mainPath + "?type=" + paramert;
  } else {
    return "";
  }
}

function getTheme(): string {
  const currentTheme: string | null = localStorage.getItem("theme");

  if (currentTheme) {
    return currentTheme === "light" ? Theme.Light : Theme.Dark;
  } else {
    return Theme.Light;
  }
}

export { getRandomNumber, createAPathWithParametr, getTheme };
