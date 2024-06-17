import { ReactElement } from "react";

import { IProps } from "./IProps";

function Label({ title = "" }: IProps): ReactElement {
  return <label>{title}</label>;
}

export default Label;
