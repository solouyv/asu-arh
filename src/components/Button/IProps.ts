import { ButtonSizes } from "../../enums/ButtonSizes";

export default interface IProps {
  text: string;
  rounded?: boolean;
  size?: ButtonSizes;
  id?: string;
  disabled?: boolean;
  onClickFunction: () => void;
}
