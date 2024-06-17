export interface IQuestion {
  title: string;
  quantityOfAnswers: number;
  isSeveralAnswers: boolean;
  variantsOfAnswer: string[];
  currectAnswer: string[];
}
