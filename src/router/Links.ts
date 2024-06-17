import { ILink } from "@interfaces/ILink";

const arithmeticOperations: ILink = {
  title: "Лабораторная работа 1",
  path: "arithmetic-operations/",
  toolTipText: "Сложение чисел в ЭВМ",
};

const addingNumbers: ILink = {
  title: "Лабораторная работа 1",
  path: "addition",
  toolTipText: "Сложение чисел в ЭВМ",
  isParameter: true,
};

const compareNumbers: ILink = {
  title: "Лабораторная работа 2",
  path: "comparing-numbers",
  toolTipText: "Логические операции ЭВМ",
};

const dynamicRAM: ILink = {
  title: "Лабораторная работа 3",
  path: "dynamic-ram",
  toolTipText: "Динамическое ОЗУ",
};

const RAM: ILink = {
  title: "Лабораторная работа 4",
  path: "ram",
  toolTipText: "ОЗУ - основная память ЭВМ",
};

const cache: ILink = {
  title: "Лабораторная работа 5",
  path: "cache",
  toolTipText: "Использование кэш в ЭВМ",
};

const multiplicationOfNumbers: ILink = {
  title: "Лабораторная работа 6",
  path: "multiplication",
  toolTipText: "Умножение чисел в ЭВМ",
  isParameter: true,
};

const laboratories: ILink = {
  title: "Лабораторые работы",
  path: "/laboratories/",
  toolTipText: "",
};

const tests: ILink = {
  title: "Тестирование",
  path: "/tests",
  toolTipText: "Пройдите тест, чтобы закрепить полученные знания",
};

const arithmeticOperationsTest: ILink = {
  title: 'Тест по теме "Арифметические операции в ЭВМ"',
  path: "arithmetic-operations",
};

const compareNumbersTest: ILink = {
  title: 'Тест по теме "Логические операции в ЭВМ"',
  path: "comparing-numbers",
};

const dynamicRAMTest: ILink = {
  title: 'Тест по теме "Динамическое ОЗУ"',
  path: "dram",
};

const ramTest: ILink = {
  title: 'Тест по теме "ОЗУ - основная память в ЭВМ"',
  path: "ram",
};

const cacheTest: ILink = {
  title: 'Тест по теме "Использование КЭШ в ЭВМ"',
  path: "cache",
};

const testLinks: ILink[] = [
  arithmeticOperationsTest,
  compareNumbersTest,
  dynamicRAMTest,
  ramTest,
  cacheTest,
];

export {
  compareNumbers,
  addingNumbers,
  multiplicationOfNumbers,
  dynamicRAM,
  RAM,
  cache,
  arithmeticOperations,
  laboratories,
  tests,
  testLinks,
  arithmeticOperationsTest,
  compareNumbersTest,
  dynamicRAMTest,
  ramTest,
  cacheTest,
};
